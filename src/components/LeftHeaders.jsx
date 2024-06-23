import React from 'react'
import {
    filterDataByPlace,
    addParentCount,
    getHeadersLength,
    getHeadersDepth,
    getNodeLentgh,
    getNodeDepth,
    getHeadersOrders,
    processLeftHeaders
} from '@/utils/helpers'
import data from '@/data.json'

const LeftHeaders = () => {
    const topHeaders = filterDataByPlace(data, 'top')
    const leftHeaders = addParentCount(filterDataByPlace(data, 'left'))

    const leftHeadersDepth = getHeadersDepth(leftHeaders)

    const topHeadersLength = getHeadersLength(topHeaders)

    const topHeadersOrders = getHeadersOrders(topHeaders)
    const leftHeadersOrders = getHeadersOrders(leftHeaders)

    const headers = processLeftHeaders(leftHeaders)

    return (
        <>
            
            <tr>
                <th colSpan={leftHeadersDepth + 1}>A</th>
                <th>B</th>
                {
                    topHeadersOrders?.map(order => (
                        <th key={`top-order-${order}`}>{order}</th>
                    ))
                }
            </tr>

            {
                headers.map((headerRow, rowIndex) => (
                    <tr key={`header-row-${rowIndex}`}>
                        {headerRow.map((header, colIndex) => {
                            return (
                                <>
                                    <th
                                        key={`header-col-${colIndex}`}
                                        colSpan={getNodeDepth(header, header.parent_count, leftHeadersDepth + 1)}
                                        rowSpan={getNodeLentgh(header)}
                                        style={{
                                            fontWeight: header.font_weight,
                                            fontStyle: header.font_style,
                                            textAlign: header.text_align,
                                            fontSize: `${parseInt(header.font_size)}px`
                                        }}
                                    >
                                        <p className={header.orientation === 'vertical' ? 'rotate-90deg' : ''}>
                                            {header.name}
                                        </p>
                                    </th>
                                </>
                            )
                        })}
                        <th>{leftHeadersOrders[rowIndex]}</th>
                        {
                            Array.from({length: topHeadersLength}, (_, cellIndex) => (
                                <td key={`cell-${cellIndex}`}/>
                            ))
                        }
                    </tr>
                ))
            }
        </>
    )
}

export default LeftHeaders
