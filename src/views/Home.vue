<template>
	<header class="container">
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
		</nav>
		<h1>List of users</h1>
	</header>
	<section class="container data-container">
		<div class="input-holder">
			<input type="text" placeholder="Search...">
		</div>

		<div v-if="isLoading" class="loading">Loading... Please wait.</div>
		<div v-if="!isLoading && isNoUser" class="no-data">No users found.</div>
		<div v-if="!isLoading && isError" class="err">There was an error. Please try again.</div>

		<div v-if="!isLoading && !isError && !isNoUser" class="users-table">
			<div class="users-table-header">
				<div class="sorted" id="name">Name <i class="fas fa-sort-down"></i></div>
				<div id="balance">Balance <i class="fas fa-sort-down"></i></div>
				<div id="isActive">Active <i class="fas fa-sort-down"></i></div>
				<div id="registered">Registered <i class="fas fa-sort-down"></i></div>
				<div id="state">State <i class="fas fa-sort-down"></i></div>
				<div id="country">Country <i class="fas fa-sort-down"></i></div>
			</div>
			<div class="users-data-container">
				<div class="user-data-row">
					<div>Boris</div>
					<div>12345679</div>
					<div>no</div>
					<div>yes</div>
					<div>oregon</div>
					<div>Unated State</div>
				</div>

				<div class="user-data-row">
					<div>Boris</div>
					<div>12345679</div>
					<div>no</div>
					<div>yes</div>
					<div>oregon</div>
					<div>Unated State</div>
				</div>

				<div class="user-data-row">
					<div>Boris</div>
					<div>12345679</div>
					<div>no</div>
					<div>yes</div>
					<div>oregon</div>
					<div>Unated State</div>
				</div>

				<div class="user-data-row">
					<div>Boris</div>
					<div>12345679</div>
					<div>no</div>
					<div>yes</div>
					<div>oregon</div>
					<div>Unated State</div>
				</div>
			</div>
		</div>
	</section>

	<footer></footer>
</template>

<script>
export default {
	name: 'Home',
	data(){
		return {
			isLoading: false,
			isError: false,
			isNoData: false,
			usersList: []
		}
	},
	methods: {
		getUsers: ()=>{
			const getUsersUrl = 'https://fww-demo.herokuapp.com/';

			this.isLoading = true;
			this.isError = false;
			this.isNoData = false;

			fetch(getUsersUrl).then((response)=>{
				if(response.ok){
					return response.json();
				}
			}).then((data)=>{
				console.log(data);
				this.isLoading = false;
				data && data.length > 0 ? this.fillUserdDataArray() : this.isNoData = true;
			}).catch((error)=>{
				console.warn(error);
				this.isLoading = false;
				this.isError = true;
			});
		},
		fillUserdDataArray(data){
			this.usersList = data;
			console.log('fill users array...');
			// proci kroz svaki i formatirati kesh brojeve
			// data.forEach((user)=>{});
		},
		formatNumber(num) {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
		}
	},
	mounted(){
		this.getUsers();
	}
}
</script>

<style lang="scss" scoped>
	section.container.data-container{
		padding-top: 2em;
		padding-bottom: 2em;
		.input-holder{
			width: 100%;
			max-width: 300px;
			margin-bottom: 2em;
			position: relative;
			input{
				width: 100%;
				border: none;
				padding: 15px;
				border-radius: $border-radious;
			}
		}
		.users-table{
			.users-table-header{
				display: flex;
				justify-content: flex-start;
				div{
					flex-grow: 1;
					background-color: $blue-very-dark;
					color: $white;
					padding: 7px;
					&#name{
						flex-grow: 2;
					}
					&#name{
						flex-grow: 0.5;
					}
					&:first-child{
						border-top-left-radius: $border-radious;
					}
					&:last-child{
						border-top-right-radius: $border-radious;
					}
				}
			}
		}
	}
</style>