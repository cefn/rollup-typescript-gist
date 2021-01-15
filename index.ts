import path from "path";
import * as rollup from "rollup";
import rollupPluginTypescript from "@rollup/plugin-typescript";

export async function transpileSourcePath(
  sourceFileRelative: string,
  exclude: string[] = ["./node_modules/**"]
) {
  try {
    const sourceDirRelative = path.dirname(sourceFileRelative);
    const input = path.resolve(process.cwd(), sourceFileRelative);
    const context = path.resolve(process.cwd(), sourceDirRelative);
    const inputOptions: rollup.InputOptions = {
      input,
      context,
      plugins: [
        rollupPluginTypescript({
          exclude,
          tsconfig: false,
          target: "es5",
          sourceMap: false,
          strict: true,
          alwaysStrict: false,
          noImplicitUseStrict: true,
        }),
      ],
      treeshake: false,
    };
    const output: rollup.OutputOptions = {
      // dir: sourceDirAbsolute,
      file: input.replace(/\.ts$/, ".js"),
      format: "es",
    };
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(output);
  } catch (error) {
    console.log(error);
    return;
  }
  console.log("Success!");
}

async function run() {
  transpileSourcePath("./sources/prefix.ts");
}

run();
