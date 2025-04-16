import React, { useContext, useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

// Register Roboto font
Font.register({
  family: "Roboto",
  src: "../assets/fonts/Roboto-Regular.ttf", // adjust the path as needed
});

const url="http://localhost:5000/";
const token=localStorage.getItem("token");
const getName= async(userId)=>{
  const response= await axios.get(url+"api/user/name",{headers:{token, userId}});
  if(response.data.success){
    return response.data.name;
  }
  else{
    return "unknown";
  }
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    color: "#333333",
    fontSize: 11, // Base font size
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: 10,
  },
  title: {
    fontSize: 22, // Slightly smaller but still bold and clear
    fontWeight: "bold",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555555",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    flexDirection: "column",
    marginBottom: 5,
  },
  label: {
    width: 80,
    fontWeight: "bold",
    fontSize: 11.5,
  },
  value: {
    flex: 1,
    fontSize: 11,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    fontSize: 11,
  },
  itemName: {
    width: "70%",
  },
  itemPrice: {
    width: "30%",
    textAlign: "right",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    fontWeight: "bold",
    fontSize: 12.5,
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    fontSize: 9,
    color: "#666666",
    textAlign: "center",
  },
});

const InvoiceDocument = ({ order }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // or false if you want 24-hour format
    });
  };

  // Format currency amounts consistently
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  const [name,setName]=useState("unknown");

  useEffect(()=>{
    async function loadName() {
      const result= await getName(order.userId);
      setName(result);
    }
    loadName();
  },[])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={[styles.header, { alignItems: "center" }]}>
          <Text style={styles.title}>INVOICE</Text>
          <Text>Invoice #: {order._id}</Text>
          <Text>Date: {formatDate(order.date)}</Text>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>

          <Text>user name: {name}</Text>
          <Text style={{ marginTop: 4 }}>
            Address: {order.address?.address}
          </Text>
          <Text style={{ marginTop: 4 }}>Phone: {order.phoneNumber}</Text>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>

          {/* Item headers */}
          <View style={[styles.item, { fontWeight: "bold" }]}>
            <Text style={styles.itemName}>Item Description</Text>
            <Text style={styles.itemPrice}>Amount</Text>
          </View>

          {/* Items list */}
          {order.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemName}>
                {item.name} × {item.quantity}
              </Text>
              <Text style={styles.itemPrice}>
                {formatCurrency(item.quantity * item.price)}
              </Text>
            </View>
          ))}

          {/* Total */}
          <View style={styles.total}>
            <Text>Total Amount</Text>
            <Text>{formatCurrency(order.amount)}</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>
              {order.paymentStatus ? "Paid" : "Pending"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Method:</Text>
            <Text style={styles.value}>{order.paymentMode}</Text>
          </View>
        </View>

        {/* Notes Section */}
        {order.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text>{order.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
