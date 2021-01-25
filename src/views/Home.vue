<template>
	
	<Header></Header>

	<section class="container data-container">
		<Filter @filterUsers="filter" :fixedUsersList="fixedUsersList" :usersList="usersList"></Filter>

		<div v-if="(usersList.length===0 && dataLoadeing.isLoading) || (dataLoadeing.isLoading && !isError)" class="loading">Loading... Please wait.</div>
		<div v-if="(usersList.length===0 && !dataLoadeing.isLoading) || (!dataLoadeing.isLoading && isNoUser)" class="no-data">No users found.</div>
		<div v-if="!dataLoadeing.isLoading && isError" class="err">There was an error. Please try again.</div>

		<div v-if="usersList.length>0 && !dataLoadeing.isLoading && !isError && !isNoUser" class="users-table">
			<div class="users-table-header">
				<div id="fullName" @click="sortByColumn">Name <i v-if="sortedColumn === 'fullName'" class="fas fa-sort-down"></i></div>
				<div id="balance" @click="sortByColumn">Balance <i v-if="sortedColumn === 'balance'" class="fas fa-sort-down"></i></div>
				<div id="isActive" @click="sortByColumn">Active <i v-if="sortedColumn === 'isActive'" class="fas fa-sort-down"></i></div>
				<div id="registered" @click="sortByColumn">Registered <i v-if="sortedColumn === 'registered'" class="fas fa-sort-down"></i></div>
				<div id="state" @click="sortByColumn">State <i v-if="sortedColumn === 'state'" class="fas fa-sort-down"></i></div>
				<div id="country" @click="sortByColumn">Country <i v-if="sortedColumn === 'country'" class="fas fa-sort-down"></i></div>
			</div>
			<div class="users-data-container">
				<div v-for="u in usersList" :key="u.id" class="user-data-row">
					<div>{{ u.fullName }}</div>
					<div>{{ u.balance }}</div>
					<div class="active-user">{{ u.isActive ? 'yes' : 'no' }}</div>
					<div>{{ u.registered }}</div>
					<div>{{ u.state }}</div>
					<div>{{ u.country  }}</div>
				</div>
			</div>
		</div>
	</section>

	<footer></footer>
</template>

<script>
import Header from '../components/Header.vue';
import Filter from '../components/Filter.vue';


export default {
	name: 'Home',
	components:{ Header, Filter },
	data(){
		return {
			sortedColumn: 'fullName',
			searchBy: 'fullName',
			dataLoadeing: {
				isLoading: true,
				isError: false,
				isNoData: false
			},
			openSearchList: false,
			fixedUsersList: [],
			usersList: []
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
		stringDatetimeToMiliseconds(str) {
			if(str.length>0){
				return Date.parse(str);
			}
			return '';
		},
		filter(filteredList){
			this.usersList = [...filteredList];
		}, 
		sortByColumn(event){
			const column = event.target.id;
			this.sortedColumn = column;
			this.usersList.sort((a,b)=>(a[column] > b[column]) ? 1 : -1);			
			console.log(column);
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
		
		.users-table{
			border: 1px solid $blue-dark;
			border-top-left-radius: 11px;
			border-top-right-radius: 11px;
			.users-table-header{
				display: flex;
				justify-content: space-between;
				div{
					cursor: pointer;
					background-color: $blue-very-dark;
					color: $white;
					font-weight: bold;
					position: relative;
					@include tableCell();
					i{
						position: absolute;
						top: 8px;
						left: 7px;
					}
					&:hover{
						text-decoration: underline;
					}
					&:first-child{
						border-top-left-radius: $border-radius;
					}
					&:last-child{
						border-top-right-radius: $border-radius;
					}
				}
			}
			.users-data-container{
				.user-data-row{
					display: flex;
					justify-content: flex-start;
					cursor: pointer;
					.active-user{
						text-transform: uppercase;
					}
					&:nth-child(2n+2){
						background: $white;
					}
					&:hover{
						// background-color: $blue-dark;
						background-color: $blue;
						color: $white;
					}
					div{
						@include tableCell();
						padding-top: 10px;
						padding-bottom: 10px;
					}
				}
			}
		}
	}
</style>