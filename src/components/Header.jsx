
import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg'
import SolidButton from './customs/buttons/SolidButton'

import {
  ArrowRightStartOnRectangleIcon,
  Bars4Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'

import {
  QuestionMarkCircleIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  UserIcon,
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline'

import {
  Layout,
  Row,
  Col,
  Drawer,
  List,
  Typography,
  Dropdown,
  Space,
  Flex,
  message
} from 'antd'

import { DownOutlined } from '@ant-design/icons'

import { useTranslation } from 'react-i18next'

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

import FilledButton from './customs/buttons/FilledButton'
import i18n from '../i18n'

import OutlineButton from './customs/buttons/OutlineButton'

import { useSelector, useDispatch } from 'react-redux'

import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const { Text } = Typography
const { Header } = Layout


const HeaderComponent = () => {

  const { t } = useTranslation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const location = useLocation()

  const { userInfo } = useSelector(state => state.auth)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en'
    i18n.changeLanguage(newLang)
  }

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
      message.success(t('logoutSuccess'))
    } catch (error) {
      message.error(error?.data?.message || error?.message)
    }
  }

  useEffect(() => {
    closeDrawer()
  }, [location])

  return (
    
    <Header className='bg-white border-b shadow-sm'>

      {/* Inner container */}
      <Row className='w-full flex justify-between items-center' >
        {/* Logo */}
        <Col>
          <Link to='/'>
            <Col>
              <img src={logo} className='w-24' alt="" />
            </Col>
          </Link>
        </Col>

        {/* Hamburger icon for mobile menu */}
        <Col className='block lg:hidden' onClick={openDrawer}>
          <OutlineButton icon={<Bars4Icon color='black' />} />
        </Col>

        {/* Drawer For the Mobile Menu */}
        <Drawer title='Menu' placement='right' onClose={closeDrawer} open={isDrawerOpen} >
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                icon: <QuestionMarkCircleIcon width={22} height={22} />,
                title: t('help'),
                link: '/help'
              },
              {
                icon: <ComputerDesktopIcon width={22} height={22} />,
                title: t('appointments'),
                link: '/appointments'
              },
              {
                icon: <ArrowRightStartOnRectangleIcon width={22} height={22} />,
                title: t('login'),
                link: '/login'
              },
              {
                icon: <PencilSquareIcon width={22} height={22} />,
                title: t('register'),
                link: '/register'
              },
            ]}
            renderItem={(item) => (
              <Link to={item.link}>
                <List.Item className="rounded-sm cursor-pointer hover:bg-sky-100">
                  <List.Item.Meta
                    className='pl-2'
                    avatar={item.icon}
                    title={<Text strong className="text-sm">{item.title}</Text>}
                  />
                </List.Item>
              </Link>
            )}
          />

          <FilledButton
            text={i18n.language === 'en' ? 'Français' : 'English'}
            icon={<LanguageIcon width={24} color='black' />}
            handleClick={toggleLanguage}
          />
        </Drawer>

        {/* Full menu - hidden on small screens */}
        <Flex className='hidden lg:flex' align='baseline' justify='center' gap={28}>
          <FilledButton
            text={i18n.language === 'en' ? 'Français' : 'English'}
            icon={<LanguageIcon width={24} color='black' />}
            handleClick={toggleLanguage}
          />
          <Link to='/login'>
            <SolidButton icon={<ComputerDesktopIcon />} text='Appointements' />
          </Link>

          {
            userInfo ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <Link to='/profile'>
                          <Flex gap={14}>
                            <UserIcon width={18} />
                            <Text>{t('myAccount')}</Text>
                          </Flex>
                        </Link>
                      ),
                      key: '0',
                    },
                    {
                      type: 'divider',
                    },
                    {
                      label: (
                        <div onClick={handleLogout}>
                          <Flex gap={14}>
                            <ArrowRightEndOnRectangleIcon width={18} />
                            <Text>{t('logout')}</Text>
                          </Flex>
                        </div>
                      ),
                      key: '1',
                    }
                  ],
                }}
              >
                <div onClick={(e) => e.preventDefault()}>
                  <Space>
                    {`${userInfo.name} ${userInfo.surname}`}
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            ) : (
              <>
                <Link to='/'>
                  <SolidButton icon={<QuestionMarkCircleIcon />} text={t('help')} />
                </Link>

                <Link to='/register'>
                  <SolidButton icon={<PencilSquareIcon />} text={t('register')} />
                </Link>
                <Link to='/login'>
                  <SolidButton icon={<ArrowRightStartOnRectangleIcon />} text={t('login')} />
                </Link>
              </>
            )
          }
        </Flex>
      </Row>
    </Header>
  )
}

export default HeaderComponent