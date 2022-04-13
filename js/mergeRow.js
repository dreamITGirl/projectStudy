/*
 * @Author: yaru.li
 * @Date: 2022-04
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-04
 * @FilePath: /projectStudy/js/mergeRow.js
 * @Description: 基于element-ui中的table合并行或列的方法
 * 
 */
// 关于表格合并行的方法
function handleNameColumn(data, key) {
    const resultObj = {}
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (Object.hasOwnProperty.call(resultObj, data[i][key])) {
          resultObj[data[i][key]].push(i)
        } else {
          const k = data[i][key]
          resultObj[k] = [i]
        }
      }
    }
    return resultObj
  }
function handleMergeLen(data, key) {
    const resultObj = handleNameColumn(data, key)
    const resultArr = []
    for (const label in resultObj) {
      if (Object.hasOwnProperty.call(resultObj, label)) {
        const tempArr = resultObj[label]
        const result = []
        for (let i = 1; i < tempArr.length; i++) {
          if (tempArr[i] - tempArr[i - 1] == 1) {
            result.push([tempArr[i - 1], tempArr[i]])
          }
        }
        const tempArr2 = []
        if (result.length > 0) {
          for (let i = 1; i < result.length; i++) {
            if (result[i][0] - result[i - 1][1] === 0) {
              tempArr2.push(...result[i - 1], ...result[i])
            } else {
              if (result[i - 1].length > 0) {
                resultArr.push(result[i - 1])
              }
            }
          }
        }
        const resArr = []
        for (let i = 0; i < tempArr2.length; i++) {
          if (!resArr.includes(tempArr2[i])) {
            resArr.push(tempArr2[i])
          }
        }
        resultArr.push(resArr)
      }
      if (resultArr[0].length === 0) {
        resultArr.shift()
      }
      const ar = resultArr[resultArr?.length - 1]
      if (ar) {
        if (ar.length === 0) {
          resultArr.pop()
        }
      }
      resultObj[label] = resultArr
    }
    return resultObj
  }
  
function arraySpanMethod(row, column, rowIndex, columnIndex, dataList, key) {
    if (columnIndex === 0) {
      const resultObj = handleMergeLen(dataList, key)
      for (const key in resultObj) {
        if (row.hosDeptName === key) {
          for (let i = 0; i < resultObj[key].length; i++) {
            const element = resultObj[key][i]
            for (let j = 0; j < element.length; j++) {
              const item = element[j]
              if (rowIndex === item) {
                if (j === 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
      }
    }
  }
// 使用方法

// {/* <el-table :span-method="arraySpanMethod"/> */}
  
  