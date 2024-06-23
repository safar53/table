import React from 'react'
import {
    filterDataByPlace,
    getHeadersDepth,
    getNodeLentgh,
    getNodeDepth,
    processTopHeaders
} from '@/utils/helpers'
import data from '@/data.json'

const TopHeaders = () => {
    const topHeaders = filterDataByPlace(data, 'top')
    const leftHeaders = filterDataByPlace(data, 'left')

    const topHeadersDepth = getHeadersDepth(topHeaders)
    const leftHeadersDepth = getHeadersDepth(leftHeaders)

    const headers = processTopHeaders(topHeaders)

    return headers.map((headerRow, rowIndex) => (
        <tr key={`header-row-${rowIndex}`}>
            {headerRow.map((header, colIndex) => {
                const colSpan = getNodeLentgh(header)
                const rowSpan = getNodeDepth(header, rowIndex, topHeadersDepth + 1)
                return (
                    <>
                        {
                            rowIndex === 0 && colIndex === 0 && (
                                <>
                                    <th rowSpan={topHeadersDepth + 1} colSpan={leftHeadersDepth + 1}></th>
                                    <th rowSpan={topHeadersDepth + 1}>
                                        <p className='rotate-90deg'>Sətrin № -si</p>
                                    </th>
                                </>
                            )
                        }
                        <th
                            key={`header-col-${colIndex}`}
                            colSpan={colSpan}
                            rowSpan={rowSpan}
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
        </tr>
    ))
}

export default TopHeaders
