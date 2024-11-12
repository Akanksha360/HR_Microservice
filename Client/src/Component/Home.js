import './Home.css';
import React from 'react'

export default function Home() {
    return (
        <>
        <h1>HR Service</h1>
        <div>
            <h3>Project Details</h3>
        <ol>
            <li>This project integrates frontend via API-Gateway(nodejs) with RMQ(RabbitMQ) on PUB-SUB Model having a background HR Service</li>
            <li>React APP Containing three Screens
                <ol>
                <li>Employee Listings,Add,Edit and Delete</li>
                <li>Department Listings,Add,Edit and Delete</li>
                <li>EmployeeDepartment Listings,Add,Edit and Delete</li>
                </ol>
            </li>
            <li>NodeJS API-GATEWAY with RMQ and Sockets</li>
            <li>This application will work as gateway serving requests from frontend and providing them service on demand basis</li>
            <li>The HR Service is build on NestJS using TypeORM</li>
        </ol>
        </div>
        </>
    )

}