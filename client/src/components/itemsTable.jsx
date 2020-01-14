import React from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';


const ItemsTable = (props) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, i) => <tr key={i}>
            <td>{i + 1}</td>
            <td><a href={item.link} target="_blank">{item.itemName}</a></td>
            <td>{formatter.format(item.price).split('').slice(0, formatter.format(item.price).split('').length - 3).join('')}</td>
            <td>{item.created.split('').slice(0, 10).join('')}</td>
            <th><i onClick={() => props.changeToEdit(item._id)} className='fas fa-edit btnedit'></i>    <i onClick={() => props.deleteOne(item._id)} className='fas fa-trash-alt btndelete'></i></th>
          </tr>)}
        </tbody>
      </Table>
      <Button variant="outline-danger" onClick={() => props.deleteAll()}>Delete All</Button>

    </div>
  )
}


export default ItemsTable;