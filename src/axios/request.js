import axios from 'axios'
import data from '../file.json'


async function contactData(){
	return await axios.get('https://ft1a03g2.revvsales.com/api/contacts/all?page_num=1', {
		headers: {
			"Content-Type" : "application/json",
			"AccessToken" : data.access_token
		}
	})
    .then(response  => {
		  // handle success
		if(response.status === 200)
			  return response.data.Contacts;
		else
			console.log(response)
		return []
    })
    .catch(error => {
      	// handle error
		  console.log(error);
		  return []
    })
}


async function postContact({name, email, mob, title}){
	return await axios({
		url: 'https://api.revvsales.com/api/contacts',
		method : "post",
		headers: {
			"Content-Type" : "application/json",
			"AccessToken" : data.access_token
		},
		data: {
			"name": name,
			"title": title,
			"email": email,
			"phone": mob
		}
	})
    .then(function (response) {
		  // handle success
		if(response.status === 200)
			  return response.data.Contacts;
		else
			console.log(response)
		return []
    })
    .catch(function (error) {
      	// handle error
		  console.log(error);
		  return []
    })
}


async function postBill(id, mob, f_name, l_name, email, total, payable, items){
	// console.log(id, mob, f_name, l_name, email, total, payable, items)
	return await axios({
		url: 'http://localhost:3000/orders',
		method : "post",
		data: {
			"id": id,
			"customer_mob": mob,
			"first_name": f_name,
			"last_name": l_name,
			"customer_email": email,
			"total_amount": total,
			"amount_payable": payable,
			"gst": 18,
			"items": items,
			"date_purchased": Date.now(),
			"document_sent": false
		}
	})
    .then(function (response) {
		console.log(response)
    })
    .catch(function (error) {
		  console.log(error);
    })
}


export {contactData, postContact, postBill}