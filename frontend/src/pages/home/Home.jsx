import React, { useEffect } from 'react'
import Herosection from '../../component/herosection/Herosection.jsx'
// import Jobs from '../jobs/Jobs'
import axios from 'axios'
import { useDispatch ,useSelector} from 'react-redux'
import { setAllVegetable } from '../../redux'
import AllVegetableSwiper from '../../component/allVegetableSwiper/AllVegetableSwiper.jsx'
import Features from '../features/Features.jsx'
import Footer from '../../component/footer/Footer.jsx'
import Farmers from '../farmers/Farmers.jsx'
import AllPesticideSwiper from '../../component/allPesticideSwiper/AllPesticideSwiper.jsx'
// import AllPesticideSwiper from '../../component/allPesticideSwiper/AllPesticideSwiper.jsx'


const Home = () => {
  const dispatch=useDispatch();

  const fetchAllProducts= async () => {
    await axios.get(`${process.env.REACT_APP_END_POINT}/vegetable`, { withCredentials: true }).then((res) => {
      console.log(res.data)
      dispatch(setAllVegetable(res.data))
    })
  }

  // get all job
  useEffect(() => {
    // fetchAllJob();;
    fetchAllProducts();
  }, []);

  const allVegetables = useSelector((state) => state.vegetables);
  const allPesticides = useSelector((state) => state.pesticides);
  console.log(allPesticides)

  const discountedProducts = allVegetables.filter((product) =>
        product.discountPrice !== null &&
        product.discountExpiry &&
        new Date(product.discountExpiry) > new Date()
    )

  

  




  return (
    <>
      <div className="home">
        <Herosection />
        {/* <Jobs /> */}
        <AllVegetableSwiper allVegetables={discountedProducts} heading={"Hot Offers"}/>
        <Features/>
        <AllVegetableSwiper allVegetables={allVegetables} heading={"Explore Vegetables"}/>
        <AllPesticideSwiper allPesticides={allPesticides} heading={"Explore Pesticides"}/>



        {/* farmers */}
        <Farmers/>

        {/* footer */}
        <Footer/>
      </div>
    </>
  )
}

export default Home