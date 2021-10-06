const ticketModel = new SoldTicket() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#soldticket-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const ticketData = {}
    formData.forEach((value, key) => {
      ticketData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      ticketModel.Edit(ticketData)
    } else {
      ticketModel.Create(ticketData)
    }

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#ticket-list').DataTable({
    data: ticketModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Passenger', data: 'passenger'
    },
    { title: 'Train', data: 'train'
    },
    { title: 'Ticket', data: 'ticket'
    },
    { title: 'Date', data: 'date'
  },
   { title: 'Edit', data: 'id',
  render: function (data, type, row, meta) {
    if (type === 'display') {
      data = '<button type="button" onclick="ticketModel.startEdit(' + data + ')"> Edit </button>'
    }
    return data
  }
},{
  title: 'Delete',
  data: 'id',
  render: function (data, type, row, meta) {
    if (type === 'display') {
      data = '<button type="button" onclick="ticketModel.DeleteById(' + row['id'] + ')"> Delete </button>'
    }
    return data
  }
},
      
    ]
  })
}
function initListRoutes () {
  window.jQuery('#routes_without').DataTable({
    data: routeWithoutTicket(),
    columns: [
      { title: 'ID', data: 'id' },
      {title: "Name", data: 'name'},
      {title: "Route", data: 'route'}

    ]
  })
}
function initTopPaidRouteList () {
  window.jQuery('#toproutes').DataTable({
    data: topPaidRoutes(),
    columns: [
      { title: 'Route', data: 'route' },
      { title: "Paid", data: 'amount'},
     
    ],

  })
}
function routeWithoutTicket(){
  let reserved_routes = [];
  let all_routes =[]
  if (localStorage.getItem("trains")) {
    JSON.parse(localStorage.getItem("trains")).forEach(function (train) {
        all_routes.push(train['id'])
      JSON.parse(localStorage.getItem("sold_ticket")).forEach(function (route) {
        
        if (route['train'] == train['route']){
          reserved_routes.push(train['id'])
        }
      });
    });
    var mySet = new Set(all_routes);
    var mySet1 = new Set(reserved_routes);
    let route_without_ticket = []
    for (let item of all_routes) {
        if (!mySet1.has(item)){
          route_without_ticket.push(item)
        }
    }
    let trains =[];
    JSON.parse(localStorage.getItem("trains")).forEach(function (train) {
      console.log(route_without_ticket.indexOf(train['id']) )
      if (route_without_ticket.indexOf(train['id']) >= 0)
        trains.push(train)

    });
    return trains;
}
}

function topPaidRoutes(amount){
  let routes = [];
  let routeObject ={};
  JSON.parse(localStorage.getItem("sold_ticket")).forEach(function (route) {

    if (routeObject[route['train']]){
      routeObject[route['train']] = Number(routeObject[route['train']]) + Number(route['ticket'])
    }
    else{
      routeObject[route['train']] =  Number(route['ticket'])
    }
  })
for (var route in routeObject) {
  routes.push([route, routeObject[route]]);
}

routes.sort(function(a, b) {
    return b[1] - a[1];
});
console.log(routes)
let top_routes = []

for (var i =0; i < routes.length; i++){
  let route={}
  route['route'] =  routes[i][0]
  route['amount'] = Number(routes[i][1])
  top_routes.push(route)
}
return top_routes.slice(0,3);
}

function initListEvents () {
  document.addEventListener('sold_ticketListDataChanged', function (e) {
    const dataTable = window.jQuery('#ticket-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}


window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
  initListRoutes()
  initTopPaidRouteList()
})

let source = []
if (localStorage.getItem("passengers")) {
    JSON.parse(localStorage.getItem("passengers")).forEach(function (item) {
        source.push(item["name"]+' '+item['surname'])
    });
}
$("#passenger").autocomplete({
    source: source
});

let source1 = []
if (localStorage.getItem("tickets")) {
    JSON.parse(localStorage.getItem("tickets")).forEach(function (item) {
        source1.push(item["price"])
    });
}
$("#ticket").autocomplete({
    source: source1
});

let source2 = []
if (localStorage.getItem("trains")) {
    JSON.parse(localStorage.getItem("trains")).forEach(function (item) {
        source2.push(item["route"])
    });
}
$("#train").autocomplete({
    source: source2
});