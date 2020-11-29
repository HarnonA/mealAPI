import {
  useTable,
  useSortBy,
  usePagination,
} from 'react-table'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { mealAdd } from '../../store/actions/meal'
import { FaYoutube, FaPlusCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom'


import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'


import './index.css'



function Table(props) {

  const [inputFilter, setInputFilter] = useState("")
  const [data, setData] = useState([])


  useEffect(() => {
    getData()
    console.log("useEfffect")
  }, [])



  const getData = async () => {
    let letter = ["a", "b",
      // "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
      // "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]

    try {
      let allMeal = await Promise.all(letter.map(async e => await getDataFromAPI(e)))
      let allMealVisible = allMeal.flat().map(e => {
        return { "visible": true, ...e }
      })
      setData(allMealVisible)
    } catch (err) {
      console.log("Something went wrong.")
    }

  }
  const getDataFromAPI = async (l) => {
    console.log("Get from API")
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
      const res1 = await res.json()
      return [...data, ...res1.meals]
    } catch (err) {
      console.log("Something went wrong.")
    }
  }

  const columns = React.useMemo(() => [
    {
      Header: '',
      accessor: 'strMealThumb',
    },
    {
      Header: 'Meal',
      accessor: 'strMeal', // accessor is the "key" in the data
    },
    {
      Header: 'Category',
      accessor: 'strCategory',
    },
    {
      Header: 'Watch',
      accessor: 'strYoutube',
    },
    {
      Header: 'Recipe',
      accessor: 'strInstructions',
    },

  ], []
  )





  function TableS({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page

      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      state: { pageIndex },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      useSortBy,
      usePagination,
    )

    function filterTable(str) {
      setInputFilter(str)
      data.forEach((e, i, a) => {
        if (!e.strMeal.startsWith(str)) {
          a[i].visible = false
        }
      })
    }

    function clearFilter() {
      setInputFilter("")
      data.forEach((e, i, a) => {
        a[i].visible = true
      })
    }

    // Render the UI for your table
    return (
      <div className="tablePage">

        <div className="filterMeal">
          <input name="filter"  >
          </input>
          <div className="filterBtn">
            <button onClick={() => filterTable(document.getElementsByName("filter")[0].value)}>Search</button>
            <button onClick={() => clearFilter()} >Clear</button>
          </div>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {/* {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })} */}
                  { row.original.visible && <>
                    <td ><img src={`${row.cells[0].value}`} alt="foodImage"></img></td>
                    <td><p>{row.cells[1].value}</p></td>
                    <td><p>{row.cells[2].value}</p></td>
                    <td>
                      <a href={row.cells[3].value}>
                        <FaYoutube className="youtubeBtn" size={32} />
                      </a>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: "/recipe",
                          params: { data: row.original }
                        }}

                      >
                        <FaPlusCircle className="plusBtn" />
                      </Link>
                    </td>
                  </>
                  }

                </tr>
              )
            })}
          </tbody>
        </table>
        {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
      </div>
    )
  }


  return (
    <div className="Table">
      <Header />
      <TableS columns={columns} data={data} />
      <Footer />
    </div>
  )
}

const mapStateToProps = ({ meal }) => {
  return {
    meal: meal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddMeal: meal => dispatch(mealAdd(meal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
// export default Table;
