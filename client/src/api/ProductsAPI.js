import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {
    const getProducts = async () => {
        await axios.get(`/api/products?${category}&title[regex]=${search}`)
        .then(res => {
            if(res.data.products){
                setProducts(res.data.products)
                setResult(res.data.result)
            } else {
                alert('후기를 가져오는데 실패하였습니다')
            }
        })
    }
    getProducts()
    },[callback, category, sort, search])
    
      

    return {
      products: [products, setProducts],
      callback: [callback, setCallback],
      category : [category, setCategory],
      sort: [sort, setSort],
      page: [page, setPage],
      search: [search, setSearch],
      result: [result, setResult]
    }
}

export default ProductsAPI
