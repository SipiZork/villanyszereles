import React, {useEffect, useState} from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import { doc, getDoc, collection, where, updateDoc } from '@firebase/firestore';
import PdfDocument from '../../components/pdf/PdfDocument';
import { useParams } from 'react-router';
import { db } from '../../firebase/firebase';

const PdfPage = () => {

  const { id } = useParams();
  const styles = StyleSheet.create({
    pdfviewer: {
      width: '100%',
      height: 'calc(100vh - .25rem)',
    }
  });

  const [customer, setCustomer] = useState(null);

  useEffect(async () => {
    let customerData = await getDoc(doc(db, 'customers', id));
    customerData = { data: customerData.data(), id: id };
    setCustomer(customerData);
    console.log(customer);
  }, []);

  return (
    <div>
      {customer !== null &&
        <PDFViewer style={styles.pdfviewer}>
          <PdfDocument customer={customer.data} />
        </PDFViewer>
      }
    </div>
  )

};
export default PdfPage;