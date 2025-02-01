import React from 'react';
import styles from './index.module.scss';
import {  FaInstagram, FaPinterest, FaYoutube  } from 'react-icons/fa';
import { AiFillTikTok } from "react-icons/ai";
import { CiYoutube } from "react-icons/ci";
import { MdLocationOn, MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Quick Links Section */}
        <div className={styles.quickLinks}>
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/">Help & FAQ</a></li>
            <li><a href="/">Returns & Exchanges</a></li>
            <li><a href="/">Shipping</a></li>
            <li><a href="/">Track Your Order</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className={styles.company}>
          <h3>Company</h3>
          <ul>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Careers</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <h3>Stay in the Know</h3>
          <p>Sign up for exclusive offers and the latest trends.</p>
          <div className={styles.newsletterInput}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <ul>
            <li><MdLocationOn /> 123 Fatia St., Targovi, Baku</li>
            <li><MdEmail /> info@fatiacosmeticshop.com</li>
          </ul>
        </div>

        {/* Social Media Links Section */}
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="/"><AiFillTikTok /></a>
            <a href="/"><FaInstagram /></a>
            <a href="/"><FaYoutube /></a>
            <a href="/"><FaPinterest /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
