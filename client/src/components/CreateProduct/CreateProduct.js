import React, {useContext, useState, useEffect} from 'react'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
import Loading from '../util/Loading/Loading'
import {useParams, useNavigate} from 'react-router-dom'
import './CreateProduct.css'

const initialState = {
    title: '',
    description: '',
    categories: '',
}



function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const navigate = useNavigate();
    const param = useParams()

    const [products] = state.productsAPI.products
    
    const [onEdit, setOnEdit] = useState(false) 
    const [callback, setCallback] = state.productsAPI.callback
   

    useEffect(() => {
        if(param.id){
            products.forEach(product => {
                if(product._id === param.id) {
                console.log(product);
                    setProduct(product)
                    setImages(product.images)
                }
            });
            setOnEdit(true)
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleUpload = async e => {
        e.preventDefault()
        try{
            if(!isAdmin) return alert("관리자 계정이 아닙니다") 
            const file = e.target.files[0] 
            if(!file) return alert("업로드 실패")
            if(file.size > 1024 * 1024 * 5) // 5mb
                return alert("사이즈가 너무 큽니다 5mb 밑의 이미지를 구해주세요")
            if(file.type !== "image/jpeg" && file.type !== "image/png" )
                return alert("jpg 또는 png 타입으로!")

                let formData = new FormData()
                formData.append('file', file)

                setLoading(true)
                const res = await axios.post('/api/upload', formData, {
                    headers : {'content-type' : 'multipart/form-data', Authorization: token}
                })
                setLoading(false)
                setImages(res.data);

        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("관리자계정이 아닙니다")
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization : token}
            }) 
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if(!isAdmin) return alert("관리자계정이 아닙니다")
            if(!images) return alert("이미지가 업로드 되지 않았습니다")
            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, 
                {headers: {Authorization : token} 
            })
            alert("수정 완료")
        }else{
            await axios.post('/api/products', {...product, images}, 
                {headers: {Authorization : token} 
            })
            alert("전송 완료")
            }
            setCallback(!callback)
            navigate('/')
        }catch (err) {
            alert(err.response.data.msg)
        }
    }
    const styleUpload = {
        display : images ? "block" : "none"
    } 

    return(
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {   
                    loading ? <div id="file_img"><Loading/></div> :
                     <div id="file_img" style={styleUpload} >
                     <img src={images ? images.url : ''} alt=""/>
                     <span onClick={handleDestroy}>X</span>
                 </div>
                }
               
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput}/>
                </div>
                <div className="row">
                    <label htmlFor="description">설명</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} onChange={handleChangeInput} rows="7"/>
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">태크 선택</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit ? "수정하기" : "생성하기"}</button>
            </form>
        </div>
    )
}

export default CreateProduct