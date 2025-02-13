import ImagePic from '@/components/ImagePic'
import Notification from '@/components/Notification'
import React from 'react'
import StoreProvider from '../StoreProvider'

function page() {
  return (
    <>
    <StoreProvider>
    <ImagePic />
    </StoreProvider>
    </>
  )
}

export default page