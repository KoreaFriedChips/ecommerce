import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='footer-container'>
            <p>ⓒ 2022 QX Tech All rights reserved</p>
            <p className='icons'>
                <a href='https://www.instagram.com/aalex_xuu/' target='_blank'>
                    <AiFillInstagram />
                </a>
                <a href='/' target='_blank'>
                    <AiOutlineTwitter />
                </a>
            </p>
        </div>
    )
}

export default Footer