// src/components/Header.jsx
import React from 'react'
import logo from '../assets/images/logo.svg'

import { UserIcon, Bars4Icon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'
import { Layout, Row, Col, Button } from 'antd'

const { Header } = Layout

const HeaderComponent = () => {
  return (
    <Header className='bg-sky-500 flex items-center px-4 h-16'>

      {/* Inner container */}
      <Row className='w-full flex justify-between items-center' >
        {/* Logo */}
        <Col>
          <img src={logo} className='w-24' alt="" />
        </Col>

        {/* Hamburger icon for mobile menu */}
        <Col className='block md:hidden'>
          <Button type='text' icon={<Bars4Icon width={30} color='white' />} />
        </Col>

        {/* Full menu - hidden on small screens */}
        <Col className='hidden md:flex space-x-4'>
          <Button type='primary'>Are you a practionner ?</Button>
          <Button type="primary" icon={<MagnifyingGlassCircleIcon width={22} />} iconPosition='start'>
            Search
          </Button>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderComponent