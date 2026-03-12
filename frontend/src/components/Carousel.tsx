import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation'; // navigation module

const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));


const Carousel = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async (it: number) => {
      try {
        const response = await axios.get('http://localhost:3001/get-product-recommendations');
        setProducts(response.data);
      } catch (error) {
        if (it < 10) {
          await sleep(100)
          fetchProducts(it + 1)
        }
        else {
          console.error('Error fetching products:', error);
          setProducts([]);
        }
      }
    };

    fetchProducts(1);
  }, []);

  return (
    <div className="content-container">
      <h2>Recommended Products!</h2>

      {products.length === 0 ? (
        <p>Unable to get recommended products...</p>
      ) : (
        <Swiper modules={[Navigation]}
          navigation spaceBetween={50} slidesPerView={3}>
          {products.map((product) => (
            <SwiperSlide key={product.title}>
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <h3>{product.title}</h3>
              <p>Price: ${Math.round(product.basePrice * (1 - product.discountRate) * product.taxRate)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

    </div>
  );
};

export default Carousel;
