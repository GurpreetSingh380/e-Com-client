import React from 'react'
import Dash from './Dash'

export default function UserDashboard() {
  return (
    <div>
      <Dash title="User-Panel" child={[{title: "Profile", route: "/dashboard/user/profile"}, {title: "Orders", route: "/dashboard/user/orders"}]}/>
    </div>
  )
}
