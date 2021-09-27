import React, {useState} from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const PdfDocument = ({ customer }) => {

  const [roomsAssemblies, setRoomsAsembiles] = useState(0);

  Font.register({
    family: "Roboto",
    src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      bakcgroundColor: '#E4E4E4',
      padding: '20px',
      fontFamily: 'Roboto',
      fontWeight: 900,
    },
    title: {
      marginTop: 5,
      marginLeft: 10,
      marginBottom: 3,
      fontSize: 14,
    },
    section: {
      marginTop: 2,
      marginLeft: 20,
      flexGrow: 1,
      fontSize: 10
    },
    text: {
      paddingLeft: '500px',
      fontSize: '500px'
    },
    line: {
      height: '1px',
      width: '100%',
      backgroundColor: 'rgb(40,40,40)'
    },
    titleBar: {
      width: '95%',
      marginLeft: '2.5%',
      marginBottom: '20px',
      border: '1px solid rgb(40,40,40)'
    }
  });

  return (
    <Document title={`${customer.name}_${customer.zipcode}`}>
      <Page size='a4' style={styles.page}>
        <View style={styles.titleBar}>
          <View style={styles.title}>
            <Text styes={styles.h1}>Megrendelő adatai:</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <Text styles={styles.text}>Név: {customer.name}</Text>
            <Text styles={styles.text}>Irányítószám: {customer.zipcode}</Text>
            <Text styles={styles.text}>Email cím: {customer.email}</Text>
            <Text styles={styles.text}>Telefonszám: {customer.phone}</Text>
          </View>
        </View>
        <View style={styles.titleBar}>
          <View style={styles.title}>
            <Text styes={styles.h1}>Lakás adatai:</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <Text styles={styles.alma}>Alapterület: {customer.size}nm</Text>
            <Text styles={styles.text}>Szobák száma: {customer.rooms}</Text>
          </View>
        </View>
        <View style={styles.titleBar}>
          <View style={styles.title}>
            <Text styes={styles.h1}>Munka adatai:</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <Text styles={styles.text}>Kábelelvezetés típusa: {customer.typeofwork === 'channeling' ? 'Falon kívül' : 'Falon belül'}</Text>
            <Text styles={styles.text}>Előszoba kiállások: {customer.hall}</Text>
            <Text styles={styles.text}>Nappali kiállások: {customer.livingroom}</Text>
            <Text styles={styles.text}>Konyha kiállások: {customer.kitchen}</Text>
            <Text styles={styles.text}>Fürdőszoba kiállások: {customer.bathroom}</Text>
            {customer.numberOfRooms.map((room, i) => (
              <Text styles={styles.text} key={i}>{room.name} kiállások: {room.assembly}</Text>
            ))}
            <Text styles={styles.text}>Összesen: {customer.allCircuit}</Text>
          </View>
        </View>
        <View style={styles.titleBar}>
          <View style={styles.title}>
            <Text styes={styles.h1}>Előkalkuláció adatai:</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <Text styles={styles.text}>Kábelelvezetés kiépítése: {customer.offers.typeOfWorkOffer} Ft</Text>
            <Text styles={styles.text}>Áramkörök kiépítése: {customer.offers.circuitOffer} Ft</Text>
            <Text styles={styles.text}>Kiállások kiépítése: {customer.offers.assemblyOffer} Ft</Text>
            <Text styles={styles.text}>Összesen: {parseInt(customer.offers.typeOfWorkOffer) + parseInt(customer.offers.circuitOffer) + parseInt(customer.offers.assemblyOffer)} Ft</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PdfDocument;
