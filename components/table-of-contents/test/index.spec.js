import { fixture, expect } from "@open-wc/testing"
import "../lib/define.js"

const tableOfContents = (container) => container.querySelector("table-of-contents")

const listRoot = (container) => container
	.querySelector("table-of-contents")
	.shadowRoot.querySelector("ol")

const nestedList = (list, child) => list.children[child].querySelector("ol")

const linksAtLevel = (list) => Array.from(
	list.querySelectorAll(":scope > li > a"),
)

describe("table-of-contents", () => {
	it("auto generates a TOC", async () => {
		const container = await fixture(`<div>
			<table-of-contents for="main-content"></table-of-contents>
			<section id="main-content">
				<h2 id="one">One</h2>
				<h3 id="one-one">One.One</h3>
				<h3 id="one-two">One.Two</h3>
				<h2 id="two">Two</h2>
				<h3 id="two-one">Two.One</h3>
				<h3 id="two-two">Two.Two</h3>
			</section>
		</div>`)

		const list = listRoot(container)

		const l1Links = linksAtLevel(list)
		expect(l1Links.map((it) => it.getAttribute("href"))).to.deep.eq(["#one", "#two"])

		const l2Links = linksAtLevel(nestedList(list, 0)).concat(linksAtLevel(nestedList(list, 1)))
		expect(l2Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#one-one", "#one-two", "#two-one", "#two-two"])
	})

	it("up to six levels deep", async () => {
		const container = await fixture(`<div>
			<table-of-contents for="main-content"></table-of-contents>
			<section id="main-content">
				<h1 id="one">One</h1>
				<h2 id="two">Two</h1>
				<h3 id="three">Three</h1>
				<h4 id="four">Four</h1>
				<h5 id="five">Five</h1>
				<h6 id="six">Six</h1>
			</section>
		</div>`)

		const l1list = listRoot(container)
		const l1Links = linksAtLevel(l1list)
		expect(l1Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#one"])

		const l2list = nestedList(l1list, 0)
		const l2Links = linksAtLevel(l2list)
		expect(l2Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#two"])

		const l3list = nestedList(l2list, 0)
		const l3Links = linksAtLevel(l3list)
		expect(l3Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#three"])

		const l4list = nestedList(l3list, 0)
		const l4Links = linksAtLevel(l4list)
		expect(l4Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#four"])

		const l5list = nestedList(l4list, 0)
		const l5Links = linksAtLevel(l5list)
		expect(l5Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#five"])

		const l6list = nestedList(l5list, 0)
		const l6Links = linksAtLevel(l6list)
		expect(l6Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#six"])
	})

	it("manual rebuild", async () => {
		const container = await fixture(`<div>
			<table-of-contents for="main-content"></table-of-contents>
			<section id="main-content">
				<h2 id="one">One</h2>
				<h3 id="one-one">One.One</h3>
				<h3 id="one-two">One.Two</h3>
				<h2 id="two">Two</h2>
				<h3 id="two-one">Two.One</h3>
				<h3 id="two-two">Two.Two</h3>
			</section>
		</div>`)

		const toc = tableOfContents(container)

		container.querySelector("#main-content").innerHTML = `
			<h2 id="apples">Apples</h2>
			<h2 id="oranges">Oranges</h2>
		`

		toc.build()

		const list = listRoot(container)
		const l1Links = linksAtLevel(list)
		expect(l1Links.map((it) => it.getAttribute("href")))
			.to.deep.eq(["#apples", "#oranges"])
	})
})
