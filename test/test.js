/**
 * @fileoverview Tests for github-annotations formatter.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("assert");
const formatter = require("../");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("formatter:compact", () => {
  describe("when passed no messages", () => {
    const code = [
      {
        filePath: "foo.js",
        messages: [],
      },
    ];

    it("should return nothing", () => {
      const result = formatter(code);

      assert.strictEqual(result, "no problems");
    });
  });

  describe("when passed an error message", () => {
    const code = [
      {
        filePath: "foo.js",
        errorCount: 1,
        warningCount: 0,
        messages: [
          {
            message: "Unexpected foo.",
            severity: 2,
            line: 5,
            column: 10,
            ruleId: "foo",
          },
        ],
      },
    ];

    it("should return a string in the format ::error", () => {
      const result = formatter(code);

      assert.strictEqual(
        result,
        "::group::EsLint foo.js: errors=1 warnings=0\n::error file=foo.js,line=5,col=10::[foo] Unexpected foo.\n::endgroup::\n\n1 problem"
      );
    });

    it("should return a string in the format ::warning", () => {
      code[0].messages[0].severity = 1;
      const result = formatter(code);

      assert.strictEqual(
        result,
        "::group::EsLint foo.js: errors=1 warnings=0\n::warning file=foo.js,line=5,col=10::[foo] Unexpected foo.\n::endgroup::\n\n1 problem"
      );
    });
  });
});
