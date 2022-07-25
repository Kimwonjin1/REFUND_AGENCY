import React, { useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../GlobalState'
import Card from '../util/card/Cards'
import axios from 'axios'
import './Review.css'
import Loading from '../util/Loading/Loading'
import ReactPaginate from 'react-paginate'
import Filters from '../Filters/Filters'

function Review() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [pageNumber, setPageNumber] = useState(0)
    const [isAdmin] = state.userAPI.isAdmin
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    
    const productPage = 8; 
    const pageVisited = pageNumber * productPage 

    const deleteProduct = async(id, public_id) =>{
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id}, {
                headers : {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
            headers : {Authorization: token}
            }) 
            await destroyImg
            await deleteProduct
            setLoading(false)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    
      }

    const checkAll = () => {
          products.forEach(product => {
            product.checked = !isCheck
          })
          setProducts([...products])
          setIsCheck(!isCheck)
        }

    const deleteAll = () => {
        products.forEach(product => {
            if(product.cheecked) deleteProduct(product._id, product.images.public_id)
        })
    }
    
      const handleCheck = (id) => {
        products.forEach(product => {
          if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
      }
    
      
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('/api/products')
            setProducts(res.data.products)
        }
        getProducts()
    }, [setProducts])
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil(products.length / productPage)

    if(loading) return <div><Loading/></div> 

    return (
        <div className="container">
           
        <div className="card-title">환불후기</div>
        <Filters/>
        {
            isAdmin && <div className="delete-all">
                <span>모두선택</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>모두삭제</button>
            </div>
        }
        <div className="cards">
          
            {
                products.slice(pageVisited, pageVisited + productPage).map((product)=> {
                    return <Card key={product._id} product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} loading={loading}/>
                })
            }
        </div>
        <ReactPaginate
            previousLabel={"이전"}
            nextLabel={"다음"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagbtn'}
                previousLinkClassName={'previousbtn'}
                nextLinkClassName={"nextbtn"}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
            />
            {products.length === 0 && <Loading/>}  
            
            </div>
        )

    }

export default Review
