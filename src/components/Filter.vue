<template>
	<div class="input-holder">
		<i class="fas fa-search"></i>
		<input @input="filter" type="text" placeholder="Search...">
		<div class="search-help-list-container">
			<div class="search-help-list-button" @click="toggleSearchList">{{ searchBy === 'fullName' ? 'full name' : searchBy === 'isActive'? 'active' : searchBy }}</div>
			<div class="search-list-box" :class="{opened: openSearchList}">
				<div class="search-list-item" @click="selectSearchBy('fullName')">Full Name</div>
				<div class="search-list-item" @click="selectSearchBy('balance')">Balance</div>
				<!-- <div class="search-list-item" @click="selectSearchBy('isActive')">Active</div> -->
				<div class="search-list-item" @click="selectSearchBy('registered')">Registered</div>
				<div class="search-list-item" @click="selectSearchBy('state')">State</div>
				<div class="search-list-item" @click="selectSearchBy('country')">Country</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['fixedUsersList'],
	data(){
		return{
			searchBy: 'fullName',
			openSearchList: false
		}
	},
	emits: ['filter-users'],
	methods: {
		toggleSearchList(){
			this.openSearchList = !this.openSearchList;
		},
		selectSearchBy(value){
			this.searchBy = value;
			this.toggleSearchList();			
		},
		filter(event){
			const filterValue = event.target.value;
			const filterByColumn = this.searchBy;
			let filteredList = [];
			filteredList = this.fixedUsersList.filter(user => user[filterByColumn].toLowerCase().includes(filterValue.toLowerCase()));
			this.$emit('filter-users', filteredList);
		}
	}
}
</script>

<style lang="scss" scoped>
.input-holder{
	margin-bottom: 2em;
	position: relative;
	i{
		position: absolute;
		top: calc(50% - 10px);
		left: 10px;
		width: 20px;
		height: 20px;
		&::before{
			font-size: 20px;
			color: $grey;
		}
	}
	input{
		display: inline-block;
		width: 200px;
		border: none;
		padding: 0 15px 0 40px;
		margin-right: 10px;
		line-height: 3em;
		border-radius: $border-radius;
		&::placeholder{
			color: $grey;
		}
	}
	.search-help-list-container{
		position: relative;
		display: inline-block;
		.search-help-list-button{
			width: 200px;
			border: none;
			padding: 0 40px 0 15px;
			line-height: 3em;
			text-transform: capitalize;
			background-color: $white;
			border-radius: $border-radius;
			position: relative;
			cursor: pointer;
			&::after{
				content: '';
				position: absolute;
				right: 15px;
				top: calc(50% - 7px);
				width: 10px;
				height: 10px;
				border-bottom: 2px solid $black;
				border-right: 2px solid $black;
				transform: rotate(45deg);
			}
		}
		.search-list-box{
			position: absolute;
			top: 120%;
			left: 0;
			right: 0;
			line-height: 3em;
			background-color: white;
			text-align: center;
			border: 1px solid $grey;
			border-radius: $border-radius;
			z-index: 1;
			display: none;
			&.opened{
				display: block;
			}
			.search-list-item{
				cursor: pointer;
				&:hover{
					background-color: $grey-lite;
					font-weight: bold;
				}
			}
		}

	}
}
</style>