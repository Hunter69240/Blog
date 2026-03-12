import { expect, describe, it } from "vitest";
import extractHeadings from "./extractHeadings";

describe("Test extractHeadings",()=>{

    it("Empty array",()=>{
        expect(extractHeadings()).toEqual([])
    })

    it("Level 1 heading",()=>{
        const markdown="# Hello"
        const result=[
            {id:"hello",text:"Hello",level:1}
        ]
        expect(extractHeadings(markdown)).toEqual(result)
    })

    it("Level 2 heading",()=>{
        const markdown="## Hello"
        const result=[
            {id:"hello",text:"Hello",level:2}
        ]
        expect(extractHeadings(markdown)).toEqual(result)
    })

    it("Level 3 heading",()=>{
        const markdown="### Hello"
        const result=[
            {id:"hello",text:"Hello",level:3}
        ]
        expect(extractHeadings(markdown)).toEqual(result)
    })

    it("Multiple heading",()=>{
        const markdown=
        `
        # title
        Content
        ## Heading level 2
        ### Heading level 3
        `

        expect(extractHeadings(markdown)).toEqual([
            {id:"title",text:"title",level:1},
            {id:"heading-level-2",text:"Heading level 2",level:2},
            {id:"heading-level-3",text:"Heading level 3",level:3}
        ])
    })
})