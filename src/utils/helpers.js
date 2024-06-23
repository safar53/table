
const filterDataByPlace = (data, place) => {
    return data.filter(node => node.place === place)
}

const addParentCount = (data, parentCount = 0) => {
    data.forEach(item => {
        item.parent_count = parentCount
        
        if (item.children && item.children.length > 0) {
            addParentCount(item.children, parentCount + 1)
        }
    })

    return data
}

const getHeadersLength = data => {
    let count = 0
    const traverse = nodes => {
        for (const node of nodes) {
            if (node.children?.length === 0) {
                count++
            }
            if (node.children) {
                traverse(node.children)
            }
        }
    }
    traverse(data)
    return count
}

const getHeadersDepth = (nodes, depth = 0) => {
    let maxDepth = depth
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            maxDepth = Math.max(maxDepth, getHeadersDepth(node.children, depth + 1))
        }
    })
    return maxDepth
}

const getNodeLentgh = node => {
    if (!node.children || node.children.length === 0) {
        return 1
    }
    return node.children.reduce((colspan, child) => colspan + getNodeLentgh(child), 0)
}

const getNodeDepth = (node, depth, headersDepth) => {
    if (!node.children || node.children.length === 0) {
        return headersDepth - depth
    }
    return 1
}

const getHeadersOrders = data => {
    let numbers = []
    let count = 0
    let parent = 0
    const traverse = nodes => {
        for (const node of nodes) {
            if (node.children?.length === 0) {
                count++
                if (node?.is_sub === '0') {
                    numbers.push(count)
                } else {
                    count--
                    parent++
                    numbers.push(`${count}-${parent}`)
                }
            }
            if (node.children) {
                traverse(node.children)
            }
        }
    }
    traverse(data)
    return numbers
}

const processTopHeaders = (nodes, depth = 0, headers = []) => {
    nodes.forEach(node => {
        if (!headers[depth]) {
            headers[depth] = []
        }
        headers[depth].push(node)
        if (node.children && node.children.length > 0) {
            processTopHeaders(node.children, depth + 1, headers)
        }
    })
    return headers
}

const processLeftHeaders = data => {
    const result = []

    const processNode = (node, group) => {
        group.push(node)
        if (node.children && node.children.length > 0) {
            processNode(node.children[0], group)
        }
    }

    const recursiveGroup = nodes => {
        nodes.forEach(node => {
            const group = []
            processNode(node, group)
            result.push(group)
            if (node.children && node.children.length > 0) {
                node.children.forEach(child => {
                    recursiveGroup(child.children.slice(1))
                })
                recursiveGroup(node.children.slice(1))
            }
        })
    }

    recursiveGroup(data)
    return result
}

export {
    filterDataByPlace,
    addParentCount,
    getHeadersLength,
    getHeadersDepth,
    getNodeLentgh,
    getNodeDepth,
    getHeadersOrders,
    processTopHeaders,
    processLeftHeaders
}