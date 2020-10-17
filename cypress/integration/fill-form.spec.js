import axios from "axios";


describe("visit page and edit document", () => {
    it("visit home page and do sign-in", async () => {
      cy.visit("https://auth.revvsales.com/signin");
      await cy.readFile('../MOCK_SERVER/db.json').then((data) => {
        const order = data.orders[data.orders.length - 1]
          console.log(data, order)

        if (order !== undefined) {
          
          let { id, items, date_purchased, document_sent, customer_mob, customer_email, first_name, last_name, total_amount, amount_payable, gst } = order;

          if (first_name === undefined) {
            first_name = '-'
          }
          if (last_name === undefined) {
            last_name = '-'
          }

          cy.get("#signin-email-field").type("manideep.naidu@outlook.com");
          cy.get("#signin-email-continue-btn").click();
          cy.get("#signin-password-field").type('1qaz2wsx');
          cy.get("#signin-button-field").click();
          cy.visit('https://ft68470o.revvsales.com/templates')
          cy.get('a[href="/template/9"]').click()
          cy.get('[data-test="templatedetails-create-doc-button"]').click()
          cy.get('[data-test="quotationtopbarinfo-docname"]').click()
          cy.get('input[name="docName"]').clear().type('digi_sale_receipt-' + id)

          cy.get('[placeholder="Enter Customer Name"]').type(first_name +" "+ last_name)
          cy.get('[placeholder="Enter Phone Number"]').type(customer_mob.length > 0 ? customer_mob : "0000000000")
          cy.get('[placeholder="Enter Email Address"]').type(customer_email)

          items.map((item, i) => {
            const {product_name, quantity, price} = item;
            cy.get(`[placeholder="Enter Item Name ${i + 1}"]`).type(product_name)
            cy.get(`[placeholder="Enter Item Quantity ${i + 1}"]`).type(quantity)
            cy.get(`[placeholder="Enter Item Price ${i + 1}"]`).type(price)
          })

          cy.get('[placeholder="Enter Total Amount"]').type(total_amount)
          cy.get('[placeholder="Enter GST"]').type(gst)
          cy.get('[placeholder="Enter Amount Payable"]').type(amount_payable)

          cy.get('button').contains('Send').click()
          cy.get('.btn-send-desc').contains('Send document link privately via email').click()
          
          cy.get('.recipientlistsection-formrow:last').within(() => {
            cy.get('[data-test="docsharing-popup-user-email"]').type(customer_email)
            cy.get('input[placeholder="First name"]').focus().should('not.be.disabled').then(() => {
              cy.get('input[placeholder="First name"]').type(first_name)
              cy.get('input[placeholder="Last name"]').focus().should('not.be.disabled').then(() => {
                cy.get('input[placeholder="Last name"]').focus().type(last_name)
              })
            })
          })

          cy.get('button').contains('Send document').click()
        }

      })

    })
  });



