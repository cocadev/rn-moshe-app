import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import CustomNavbar from "../Components/CustomNavbar";
import UtilService from "../utils/utilService";

const MarketplacePage = ({ navigation, route }) => {

  const { data } = route.params;
  const { id: address, chain } = data;
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    isInitialized && onGetAllCollections()
  }, [isInitialized])

  const onGetAllCollections = async () => {
    const c1 = {
      address,
      chain,
      limit: 5
    };
    console.log('id::::::::::::::::::', c1)

    const data = await Web3Api.token.getNFTOwners(c1);
    console.log('datcca::::::::::::::::::', data)
    setNFTs(data?.result)
  }

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'Marketplace'} />

        <View style={{ marginTop: 12 }}>

          {nfts.length > 0 && nfts.map((item, index) => {
            const { name, image, description } = JSON.parse(item.metadata) || '-';

            return (
              <TouchableOpacity 
                key={index} 
                style={{ flexDirection: 'row', backgroundColor: '#ededed', padding: 10, borderRadius: 25, marginTop: 12 }}
                onPress={()=>{
                  navigation.navigate("NFTMarketDetail", {
                    data: item, chain})
                }}
              >
                <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center' }}>
                  <Image source={{ uri: UtilService.ConvetImg(image) }} style={{ width: 130, height: 150, borderRadius: 20 }} />
                  <Text style={{ color: '#000', fontSize: 10, maxWidth: 120, textAlign: 'center'}}>{name}</Text>
                  <View style={{ backgroundColor: '#000', marginTop: 2, borderRadius: 20, alignItems: 'center', width: 70 }}>
                    <Text style={{ color: '#fff' }}>Buy</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                <TouchableOpacity style={{ backgroundColor: '#bebfbc', padding: 12, borderRadius: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#fff' }}>{name}</Text>
                </TouchableOpacity>
                  <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', flex: 1, maxHeight: 60, overflow: 'hidden' }}>
                      <Text style={{ color: '#fff', fontSize: 8 }}>Total</Text>
                      <Text style={{ color: '#fff', fontSize: 12 }}>{1}</Text>
                    </View>
                    <View style={{ backgroundColor: '#22DBBB', padding: 12, borderRadius: 12, alignItems: 'center', marginLeft: 8, flex: 1 }}>
                      <Text style={{ color: '#fff', fontSize: 8 }}>Price</Text>
                      <Text style={{ color: '#fff', fontSize: 12 }}>-</Text>
                    </View>
                  </View>
                  <Text style={{ color: '#174B42', fontSize: 10, marginTop: 8, maxHeight: 80 }}>
                    {description}
                  </Text>
                </View>
              </TouchableOpacity>)
          })}
        </View>
      </ScrollView>

      <CustomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    maxWidth: 220,
    marginRight: 20,
    // paddingBottom: 0
  }
});

export default MarketplacePage;