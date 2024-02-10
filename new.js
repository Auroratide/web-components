/* eslint-disable no-console */
import * as path from "path"
import * as fse from "fs-extra"
import { program } from "commander"

// NOTE: fs-extra does not support esm, so readFile and readJson do not import
// for now, fs is used for reading/writing files, and a read/writeJson is shimmed
// See: https://github.com/jprichardson/node-fs-extra/issues/746
import * as fs from "fs/promises"

const readJson = async (file) => fs.readFile(file, { encoding: "utf-8" }).then((data) => JSON.parse(data))
const writeJson = async (file, json) => fs.writeFile(file, JSON.stringify(json, null, 4), { encoding: "utf-8" })

const capitalize = (str) => str[0].toUpperCase() + str.substring(1)
const toPascalCase = (kabab) => kabab.split("-").map(capitalize).join("")

const replaceExampleWithNew = (newName) => (oldContent) => oldContent
	.replaceAll("example-component", newName)
	.replaceAll("ExampleComponentElement", toPascalCase(newName) + "Element")

const cloneExampleComponent = async (newName) => {
	const PATH_TO_EXAMPLE = path.join("components", "example-component")
	const PATH_TO_NEW = path.join("components", newName)

	const replace = replaceExampleWithNew(newName)

	// (1) Clone the example
	await fse.copy(PATH_TO_EXAMPLE, PATH_TO_NEW, {
		errorOnExist: true,
		recursive: true,
	})

	// (2) Remove generated files and folders
	await Promise.all([
		fse.remove(path.join(PATH_TO_NEW, "lib")),
		fse.remove(path.join(PATH_TO_NEW, "node_modules")),
	])

	// (3) Rename component in files
	const renameInFile = (file) => fs.readFile(file, { encoding: "utf-8" })
		.then((content) => fs.writeFile(file, replace(content), { encoding: "utf-8" }))

	await Promise.all([
		renameInFile(path.join(PATH_TO_NEW, "src", "define.ts")),
		renameInFile(path.join(PATH_TO_NEW, "src", "index.ts")),
		renameInFile(path.join(PATH_TO_NEW, "test", "index.spec.js")),
		renameInFile(path.join(PATH_TO_NEW, "package.json")),
		renameInFile(path.join(PATH_TO_NEW, "README.md")),
	])

	// (4) Give a unique port number for testing
	const count = (await fs.readdir(path.join("components"))).length
	const newPort = 10000 + count
	await fs.readFile(path.join(PATH_TO_NEW, "package.json"), { encoding: "utf-8" })
		.then((content) => fs.writeFile(path.join(PATH_TO_NEW, "package.json"), content.replaceAll("10001", newPort.toString()), { encoding: "utf-8" }))
}

const makeRouteInDocs = async (newName) => {
	const PATH_TO_EXAMPLE = path.join("docs", "src", "routes", "example-component")
	const PATH_TO_NEW = path.join("docs", "src", "routes", newName)

	const replace = replaceExampleWithNew(newName)

	// (1) Clone the example
	await fse.copy(PATH_TO_EXAMPLE, PATH_TO_NEW, {
		errorOnExist: true,
		recursive: true,
	})

	// (2) Rename component in files
	const renameInFile = (file) => fs.readFile(file, { encoding: "utf-8" })
		.then((content) => fs.writeFile(file, replace(content), { encoding: "utf-8" }))

	await renameInFile(path.join(PATH_TO_NEW, "+page.svelte"))

	// (3) Add to doc package
	const packageJson = await readJson(path.join("docs", "package.json"))
	packageJson.dependencies[`@auroratide/${newName}`] = "workspace:^"

	await writeJson(path.join("docs", "package.json"), packageJson)
}

program
	.argument("<name>", "name of the component")
	.action(async (name) => {
		console.log(`Cloning example component into ${name}...`)
		await Promise.all([
			cloneExampleComponent(name),
			makeRouteInDocs(name),
		])

		console.log("Done! Run `pnpm i` and test the component before adding.")
	})
	.parse()
