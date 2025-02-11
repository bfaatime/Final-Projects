import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const brands = [
    { name: 'L\'Oréal', logo: 'https://cdn-icons-png.freepik.com/512/5968/5968682.png' },
    { name: 'Estée Lauder', logo: 'https://images.seeklogo.com/logo-png/4/1/estee-lauder-logo-png_seeklogo-49537.png' },
    { name: 'Clinique', logo: 'https://images.squarespace-cdn.com/content/v1/5e20c0afa2db92534e6462ac/1621963352624-27YVJS3JOPZA3RIC1A13/connect-with-clinique' },
    { name: 'Victoria`Secret', logo: 'https://seeklogo.com/images/V/victorias-secret-logo-6649A01818-seeklogo.com.png' },
    { name: 'MAC Cosmetics', logo: 'https://1000logos.net/wp-content/uploads/2020/07/MAC-Cosmetics-Logo.jpg' },
    { name: 'Fenty Beauty', logo: 'https://images.ctfassets.net/o168wnc4ptip/6KtkYzmmCDb54fpZCZ0rQ5/f06c39cceb4c94ca342da56b9ff46813/FENTY_RIHANNA_01.jpg' },
    { name: 'Dior', logo: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/7d0ecd49047677.58a9cd0803834.jpg' },
    { name: 'Dyson', logo: 'https://miro.medium.com/v2/resize:fit:1200/1*iIm4HULR3P7vqiwo8To6RA.jpeg' },
    { name: 'Rare Beauty', logo: 'https://brandingforum.org/wp-content/uploads/2024/03/s2629509-av-3-zoom_result-5a6e45d185cf483f8dfd6163d58971bc.webp' },
    { name: 'YSL', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvnV0v-1aCIdYtPTg1uyChDd2Ca1rYM4Iw6oyvXrk6Fipd-SAjjUU_kQiFDU9kW1qaaAM&usqp=CAU' },
    { name: 'Chanel', logo: 'https://thumbs.dreamstime.com/b/coco-chanel-brand-popular-chanel-logo-white-over-black-background-clean-clear-round-icon-design-coco-chanel-popular-194791252.jpg' },
    { name: 'Sol de Janeiro', logo: 'https://content.flexlinks.com/sharedimages/ProgramSquareLogo/216113.png' },
    { name: 'NARS', logo: 'https://static-beautyhigh.stylecaster.com/2014/09/christopher-kane-for-nars-logo.jpg' },
    { name: 'Tarte', logo: 'https://crueltyfree.peta.org/wp-content/uploads/tarte-logo.jpg' },
    { name: 'Charlotte Tilbury', logo: 'https://i.pinimg.com/550x/a3/2a/35/a32a35ea05939fbb97ad4e603901e658.jpg' },
    { name: 'ONE/SIZE by Patrick Starrr', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ4neGtGJVjcLBC16u_k1MQ3HI1t1H8Yh4QA&s' },
  ];

const Brands = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/shop?search=${brandName}`); // Redirect to Shop page with brand as search query
  };

  return (
    <div className={styles.brandsContainer}>
      <h1>Our Brands</h1>
      <div className={styles.brandsList}>
        {brands.map((brand, index) => (
          <div key={index} className={styles.brandCard} onClick={() => handleBrandClick(brand.name)}>
            <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
