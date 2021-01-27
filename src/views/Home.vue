<template>
	
	<Header></Header>

	<section class="container data-container">
		<Filter @filterUsers="filterHandler" @paginationStep="paginationStepHandler"></Filter>
		
		<Loader v-if="(usersList.length===0 && dataLoadeing.isLoading) || (dataLoadeing.isLoading && !dataLoadeing.isError)"></Loader>
		<div v-if="(usersList.length===0 && !dataLoadeing.isLoading) || (!dataLoadeing.isLoading && dataLoadeing.isNoUser)" class="no-data">No users found...</div>
		<div v-if="!dataLoadeing.isLoading && dataLoadeing.isError" class="err">There was an error. Please try again.</div>
		
		<UsersTable @sortBy="sortingHandler" :usersToShow="usersToShow" :isError="dataLoadeing.isError" :isLoading="dataLoadeing.isLoading" :isNoUser="dataLoadeing.isNoUser"></UsersTable>
		
	</section>

	<section v-if="usersToShow.length>0" class="container pagination-buttons-container">
		<button class="previous" :class="{clicable: !isFirstPage}" @click="nextPreviousPage" :disabled="isFirstPage"><i class="fas fa-chevron-left"></i></button>
		<button class="next" :class="{clicable: !isLastPage}" @click="nextPreviousPage" :disabled="isLastPage"><i class="fas fa-chevron-right next"></i></button>
	</section>

	<footer></footer>
</template>

<script>
import Header from '../components/Header.vue';
import Filter from '../components/Filter.vue';
import UsersTable from '../components/UsersTable.vue';
import Loader from '../components/Loader.vue';


export default {
	name: 'Home',
	components:{ Header, Filter, UsersTable, Loader },
	data(){
		return {
			searchBy: 'fullName',
			pagination: {
				step: 20,
				from: 0,
				to: 20
			},
			isFirstPage: true,
			isLastPage: false,
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
		setUsersToShowArray(){
			this.usersToShow = this.usersList.filter((user, index) => index>=this.pagination.from && index<this.pagination.to);
		},
		nextPreviousPage(e){
			const isNext = e.target.classList.contains('next');
			if(isNext){
				console.log('Next page...');
				this.pagination.from += this.pagination.step;
				this.pagination.to += this.pagination.step;
				this.isFirstPage = false;
				this.isLastPage = this.usersToShow.length < this.pagination.step;
			}else{
				console.log('Previous page...');
				this.pagination.from<this.pagination.step ? this.pagination.from = 0 : this.pagination.from -= this.pagination.step;
				this.pagination.to -= this.pagination.step;
				this.pagination.from==0 ? this.isFirstPage = true : null;
				this.isLastPage = false;
			}
			this.setUsersToShowArray();
		},
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
					this.setUsersToShowArray();
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
			this.pagination.step = paginationObj.step;
			this.pagination.from = 0;
			this.pagination.to = paginationObj.step;
			this.setUsersToShowArray();
		},
		filterHandler(filterObj){
			this.usersList = this.fixedUsersList.filter(user => user[filterObj.filterByColumn].toLowerCase().includes(filterObj.filterByValue.toLowerCase()));
			this.setUsersToShowArray();
		}, 
		sortingHandler(sortObj){
			const column = sortObj.sortValue;
			sortObj.isReversed ? this.usersList.reverse() : this.usersList.sort((a,b)=>(a[column] > b[column]) ? 1 : -1);
			this.setUsersToShowArray();
		}
	},
	mounted(){
		this.getUsers();
	}
}
</script>

<style lang="scss" scoped>
	.no-data,
	.err{
		text-align: center;
		padding: 2em;
		font-size: 2rem;
		font-weight: bold;
		color: #dd9c36;
		text-shadow: 2px 2px 4px #CE5937;
	}
	.err{
		color: red;
		text-shadow: 2px 2px 4px #CE5937;
	}
	section.container.data-container{
		padding-top: 2em;
		padding-bottom: 2em;
	}
	section.pagination-buttons-container{
		padding-bottom: 2em;
		display: flex;
		justify-content: center;
		button{
			background-color: $white;
			width: 40px;
			height: 40px;
			border: 1px solid $blue-dark;
			border-radius: 50%;
			&.clicable{
				cursor: pointer;
				&:hover{
					background-color: rgba($color: $yellow, $alpha: 0.5);
				}
			}
		}
		.previous{
			margin-right: 15px;
		}
	}
</style>