import { CATEGORIES } from "@/utils/data/products"
import React, { useState } from "react"
import { FlatList, View } from 'react-native'
import { CategoryButton } from "../components/CategoryButton"
import Header from "../components/Header"

export default function Home() {

  const [categorySelected, setCategorySelected] = useState(CATEGORIES[0])


  return (
    <View className='flex-1 pt-8'>
      <Header title='Faça seu pedido' cartQuantity={1} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            onPress={() => setCategorySelected(item)}
            isSelected={item === categorySelected}
          />)}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}