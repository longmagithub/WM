<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~assets/logo.png" alt="logo">
        </router-link>
        <router-link to="/404">404</router-link>
        <router-link to="/store">store</router-link>
        <router-link to="/mock">mock</router-link>
        <router-link to="/help">help</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<style lang="sass">
@import './style/base.scss';
</style>
