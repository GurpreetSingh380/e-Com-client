import React from 'react'
import Dash from './Dash'
import bgDash from '../images/bgDash.jpg'

export default function AdminDashboard() {
  return (
    <div>
      <Dash title="Admin-Panel" child={[{title: "Create Category", route: "/dashboard/admin/category"}, {title: "Create Products", route: "/dashboard/admin/products"}, {title: "Users", route: "/dashboard/admin/users"}]}/>
    </div>
  )
}