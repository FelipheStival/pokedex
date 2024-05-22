import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pokemons',
        loadChildren: () => import('../../pages/pokemons/pokemons.module').then(m => m.PokemonsPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../../pages/favorites/favorites.module').then(m => m.FavoritesPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pokemons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
