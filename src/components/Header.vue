<template>
	<header class="container">
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
		</nav>
		<h1>List of users</h1>
	</header>
</template>

<style lang="scss" scoped>
	header{
		text-align: center;
		nav{
			padding: 15px 0;
			a{
				font-size: 1.2rem;
				&:first-child{
					margin-right: 20px;
				}
				&:hover{
					cursor: pointer;
					color: $grey;
				}
			}
		}
		h1{
			margin-top: 0;
		}
	}
</style>