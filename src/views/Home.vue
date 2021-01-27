<template>
	
	<Header></Header>

	<section class="container data-container">
		<Filter @filterUsers="filterHandler" @paginationStep="paginationStepHandler"></Filter>
		
		<div v-if="(usersList.length===0 && dataLoadeing.isLoading) || (dataLoadeing.isLoading && !dataLoadeing.isError)" class="loading">Loading... Please wait.</div>
		<div v-if="(usersList.length===0 && !dataLoadeing.isLoading) || (!dataLoadeing.isLoading && dataLoadeing.isNoUser)" class="no-data">No users found.</div>
		<div v-if="!dataLoadeing.isLoading && dataLoadeing.isError" class="err">There was an error. Please try again.</div>
		
		<UsersTable @sortBy="sortingHandler" :usersToShow="usersToShow" :isError="dataLoadeing.isError" :isLoading="dataLoadeing.isLoading" :isNoUser="dataLoadeing.isNoUser"></UsersTable>
		
	</section>


	<footer></footer>
</template>

<script>
import Header from '../components/Header.vue';
import Filter from '../components/Filter.vue';
import UsersTable from '../components/UsersTable.vue';


export default {
	name: 'Home',
	components:{ Header, Filter, UsersTable },
	data(){
		return {
			searchBy: 'fullName',
			pagination: {
				step: 20,
				from: 0,
				to: 20
			},
			dataLoadeing: {
				isLoading: true,
				isError: false,
				isNoData: false
			},
			fixedUsersList: [],
			usersList: [],
			usersToShow: []
		}
	},
	methods: {
		getUsers(){
			const getUsersUrl = 'https://fww-demo.herokuapp.com/';

			this.dataLoadeing.isLoading = true;
			this.isError = false;
			this.isNoData = false;

			fetch(getUsersUrl).then((response)=>{
				if(response.ok){
					return response.json();
				}
			}).then((data)=>{
				this.dataLoadeing.isLoading = false;
				if(data){
					data.forEach(country => {
						country.state.forEach(state => {
							state.users.forEach((user) => {
								this.addUserToArray(country, state, user);					
							});
						});
					});
					this.usersList.sort((a,b)=>(a.fullName > b.fullName) ? 1 : -1);
					this.usersToShow = this.usersList.filter((user, index) => index>=this.pagination.from && index<this.pagination.to);
				}

			}).catch((error)=>{
				console.warn(error);
				this.dataLoadeing.isLoading = false;
				this.isError = true;
			});
		},
		addUserToArray(country, state, user){
			let userObj;
			userObj = user;
			userObj.state = state.name;
			userObj.country = country.country;
			this.fixedUsersList.push(userObj);
			this.usersList.push(userObj);
			// console.log(userObj);
		},
		paginationStepHandler(paginationObj){
			console.log(this.pagination);
			this.pagination.step = paginationObj.step;
			this.pagination.from = 0;
			this.pagination.to = paginationObj.step;
			this.usersToShow = this.usersList.filter((user, index) => index>=this.pagination.from && index<this.pagination.to);
		},
		filterHandler(filterObj){
			this.usersList = this.fixedUsersList.filter(user => user[filterObj.filterByColumn].toLowerCase().includes(filterObj.filterByValue.toLowerCase()));
			this.usersToShow = this.usersList.filter((user, index) => index>=this.pagination.from && index<this.pagination.to);
		}, 
		sortingHandler(sortValue){
			const column = sortValue;
			this.usersList.sort((a,b)=>(a[column] > b[column]) ? 1 : -1);			
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
	}
</style>