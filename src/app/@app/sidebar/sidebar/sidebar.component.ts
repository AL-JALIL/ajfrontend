import { Component, inject, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { EmrNavigationModule, HDividerComponent } from '@elementar/components';
import { MatRipple } from '@angular/material/core';
import { OrderByPipe } from '@elementar/components';
import { ToolbarComponent } from '@app/sidebar/_toolbar/toolbar.component';
import { PermissionService } from '../../../services/authentication/permission.service';

export interface NavItem {
  type: string;
  name: string;
  icon?: string;
  id?: string | number;
  link?: string;
  children?: NavItem[];
  permission: string | string[];  // Add this line to include the permission property

}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    EmrNavigationModule,
    MatRipple,
    ToolbarComponent,
    OrderByPipe,
    HDividerComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    'class': 'sidebar'
  }
})
export class SidebarComponent {
  router = inject(Router);
  location = inject(Location);
  height: string | null = '200px';

  @ViewChild('navigation', { static: true })
  navigation!: any;

  navItems: NavItem[] = [

    {
      id: 'dashboard',
      type: 'group',
      name: 'Dashboard',
      icon: 'dashboard',
      permission: 'View Dashboard',
      children: [
        {
          type: 'link',
          name: 'Vaccine Dashboard',
          link: '/pages/dashboard',
          permission: 'View Dashboard',

        }
      ]
    },

    {
      id: 'users',
      type: 'group',
      name: 'Config Users & Audit',
      icon: 'person',
      permission: ['User Management', 'View Permission', 'View Role'],
      children: [
        // {
        //   type: 'link',
        //   name: 'System Audits',
        //   link: '/pages/users/permissionsh',
        //   permission: 'System Audit',

        // },
        {
          type: 'link',
          name: 'Manage Users',
          link: '/pages/users',
          permission: 'User Management',

        },
        {
          type: 'link',
          name: 'Manage Roles',
          link: '/pages/users/role-permission',
          permission: 'View Role',

        },
        {
          type: 'link',
          name: 'Permission',
          link: '/pages/users/permission',
          permission: 'View Permission',

        },
      ]
    },
    {
      id: 'configid',
      type: 'group',
      icon: 'settings',
      name: 'System Configuration',
      permission: 'Setup Management',
      children: [
        {
          type: 'link',
          name: 'View Country',
          link: '/pages/config/country',
          permission: 'View Country',

        },
        {
          type: 'link',
          name: 'Location',
          link: '/pages/config/location',
          permission: 'View Location',
        },
        {
          type: 'link',
          name: 'Employer',
          link: '/pages/config/employer',
          permission: 'View Employer',
        },
        {
          type: 'link',
          name: 'Work Station',
          link: '/pages/config/work-station',
          permission: 'View Workstation',
        },
        {
          type: 'link',
          name: 'Employer Type',
          link: '/pages/config/employer-type',
          permission: 'View Employer Type',
        },
        // {
        //   type: 'link',
        //   name: 'Tab Panel',
        //   link: '/pages/navigation/tab-panel',
        //   permission: 'View Country',

        // },
      ]
    },

    // {
    //   id: 'profile',
    //   type: 'group',
    //   name: 'User Profile',
    //   icon: 'menu',
    //   permission: 'Setup Management',
    //   children: [
    //     {
    //       type: 'link',
    //       name: 'Talent Profile',
    //       link: '/pages/user-profile/talent-profile',

    //       permission: 'View Permission',

    //     }
    //   ]
    // },

  ];
  navItemLinks: NavItem[] = [];
  activeLinkId: any = '/';

  constructor(public permission: PermissionService) {}

  ngOnInit() {
    this.navItems.forEach(navItem => {
      this.navItemLinks.push(navItem);

      if (navItem.children) {
        this.navItemLinks = this.navItemLinks.concat(navItem.children as NavItem[]);
        this.updateMenu();
      }
    });
    this._activateLink();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this._activateLink();
        this.updateMenu();
      })
    ;
  }

  private _activateLink() {
    const activeLink = this.navItemLinks.find(
      navItem => navItem.link === this.location.path()
    );

    if (activeLink) {
      this.activeLinkId = activeLink.link;
    } else {
      this.activeLinkId = null;
    }
  }


  //====================================== code zangu mwanzo hapa ============================

  // Function to check if the user has permission for a specific action
  hasPermission(action: string | string[]): boolean {
    if (Array.isArray(action)) {
      // If it's an array, check if the user has permission for at least one action
      return action.some(permission => this.permission.parmissionMatched([permission.trim()]));
    } else {
      // If it's a string, check if the user has permission for that action
      return this.permission.parmissionMatched([action.trim()]);
    }
  }

  // Function to filter out menu items based on permissions
filterMenuByPermissions(menu: Array<NavItem>): Array<NavItem> {
  return menu
    .map(group => {
      // Check if the group itself has a permission and if it's valid
      if (group.permission && !this.hasPermission(group.permission)) {
        // If the group's permission is not met, exclude it entirely
        return null;
      }

      return {
        ...group,
        children: group.children ? this.filterChildrenByPermissions(group.children) : []
      };
    })
    .filter(group => group !== null && group.children.length > 0) as NavItem[];
}

// Recursive function to filter children based on permissions
filterChildrenByPermissions(children: Array<NavItem>): Array<NavItem> {
  return children
    .map(item => ({
      ...item,
      children: item.children ? this.filterChildrenByPermissions(item.children) : []
    }))
    .filter(item => {
      if (!item.permission) {
        // If the menu item does not have a permission specified, include it in the filtered menu
        return true;
      }
      return this.hasPermission(item.permission);
    });
}


// // Function to filter out menu items based on permissions
// filterMenuByPermissions(menu: Array<NavItem>): Array<NavItem> {
//   return menu.map(group => ({
//     ...group,
//     children: group.children ? this.filterChildrenByPermissions(group.children) : []
//   })).filter(group => group.children.length > 0);
// }

// // Recursive function to filter children based on permissions
// filterChildrenByPermissions(children: Array<NavItem>): Array<NavItem> {
//   return children
//     .map(item => ({
//       ...item,
//       children: item.children ? this.filterChildrenByPermissions(item.children) : []
//     }))
//     .filter(item => {
//       if (!item.permission) {
//         // If the menu item does not have a permission specified, include it in the filtered menu
//         return true;
//       }
//       return this.hasPermission(item.permission);
//     });
// }


  // Function to update the menu based on user permissions
  updateMenu(): void {
    this.navItems = this.filterMenuByPermissions(this.navItems);
  }


  //====================================== code zangu mwisho hapa ============================
}
