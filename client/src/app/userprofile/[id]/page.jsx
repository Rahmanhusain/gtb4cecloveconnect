
import StoreProvider from '@/app/StoreProvider'
import FullProfile from '@/components/FullProfile'
import React from 'react'

export default function page({params}) {

    
    return (
        

       <StoreProvider>
        <FullProfile userid={params.id}/>
       </StoreProvider>
        
    )
}
