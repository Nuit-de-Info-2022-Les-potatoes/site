import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CardComponent from "../components/Card/CardComponent";
import BoardComponent from "../components/BoardComponent";

export default function Home() {
  return (
    <BoardComponent/>
  )
}
