/**
 * @fileoverview GitHub checks annotations formatter
 */

"use strict";

const path = require("path");

const ESCAPE_MAP = { "%": "", "\n": "%0A", "\r": "%0D" };
const ESCAPE_REGEXP = new RegExp(`${Object.keys(ESCAPE_MAP).join("|")}`);

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns a escaped string for GitHub checks annotations
 * @param {string} string to escape
 * @returns {string} escaped string
 * @private
 */
function githubEscape(string) {
  return string.replace(ESCAPE_REGEXP, (match) => ESCAPE_MAP[match]);
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {
  let output = "";
  let total = 0;

  results.forEach((result) => {
    if (result.messages.length === 0) return;

    const relPath = path.relative(process.cwd(), result.filePath);

    total += result.messages.length;

    output += `::group::EsLint ${relPath}: errors=${result.errorCount} warnings=${result.warningCount}\n`;
    result.messages.forEach((message) => {
      output += `::${message.severity === 1 ? "warning" : "error"} `;
      output += `file=${relPath},line=${message.line || 0}`;
      output += message.column ? `,col=${message.column}` : "";
      output += message.ruleId ? `::[${message.ruleId}]` : "";
      output += ` ${githubEscape(message.message)}`;
      output += "\n";
    });
    output += "::endgroup::\n";
  });

  if (total === 0) {
    output += "no problems";
  } else {
    output += `\n${total} problem${total !== 1 ? "s" : ""}`;
  }

  return output;
};
