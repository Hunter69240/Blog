 const extractHeadings = (markdown = "") => {
    if (!markdown) return []
    return markdown
        .split("\n")
        .filter((line) => /^#{1,3}\s/.test(line))
        .map((line) => {
            const match = line.match(/^(#{1,3})\s+(.+)/)
            if (!match) return null
            const level = match[1].length
            const text = match[2].trim()
            const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
            return { id, text, level }
        })
        .filter(Boolean)
}

export default extractHeadings;