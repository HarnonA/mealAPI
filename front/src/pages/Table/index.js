import {
  useTable,
  useSortBy,
  usePagination,
} from 'react-table'
import React, { useEffect, useState } from 'react'
import { FaYoutube, FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select'
import { Link } from 'react-router-dom'

import { mealAdd } from '../../store/actions/meal'

import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'


import './index.css'



import axios from 'axios'
import { connect } from 'react-redux';

function Table(props) {

  const [data, setData] = useState([])



  useEffect(() => {
    if (data.length === 0) getData()

  }, [data])

  const call = () => {
    if (data.length === 0) getData()
  }



  const getData = () => {
    let letter = ["a", "b",
      "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
      "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]
    letter.map(e => getDataFromAPI(e))
  }

  const getDataFromAPI = (l) => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
      // axios.get()
      .then( res => {
        res.data.meals.map( async (e) => {
          let newArr = data
          newArr.push(await e)
          setData(newArr)
          console.log(newArr)
        })
        props.onAddMeal(data);
        console.log(data)
      }).catch(err => console.log(err))
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



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    prepareRow,
  } = useTable(
    {
      columns,
      data: props.meal.meal,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  )


  const options = data.map(e => {
    return { value: e.strMeal, label: e.strMeal }
  })


  const SearchTab = () => (

    <>
      <Select className="search" options={options} />

    </>
  )



  return (
    <div className="Table">
      {()=>call()}
      {console.log("My props")}
      {console.log(props)}
      
      <Header />

      <div className="tablePage">


        <SearchTab />


        <table {...getTableProps()} >
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
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
                <>
                  <tr
                    {...row.getRowProps()}

                  >

                    {console.log(row.cells[0].value)}
                    <td ><img src={`${row.cells[0].value}`} alt="foodImage"></img></td>
                    <td><p>{row.cells[1].value}</p></td>



                    <td><p>{row.cells[2].value}</p></td>
                    <td>
                      <a href={row.cells[3].value}>
                        <FaYoutube className="youtubeBtn" size={"2rem"} />
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


                  </tr>

                </>
              )
            })}
          </tbody>
        </table >
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
      < Footer />
    </div>
  )
}

const mapStateToProps = ({ meal }) => {
  return {
    meal: meal
    //       name: user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddMeal: meal => dispatch(mealAdd(meal))
  }
}

// export default Table;
export default connect(mapStateToProps, mapDispatchToProps)(Table);