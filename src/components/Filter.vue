<template>
	<div class="input-holder">
		<i class="fas fa-search"></i>
		<input @input="filter" v-model="filterValue" type="text" placeholder="Search...">
		<div class="search-list-container">
			<div class="search-list-button" @click="toggleSearchList">{{ searchBy === 'fullName' ? 'full name' : searchBy === 'isActive'? 'active' : searchBy }}</div>
			<div class="search-list-box" :class="{opened: openSearchList}">
				<div class="search-list-item" @click="selectSearchBy('fullName')">Full Name</div>
				<div class="search-list-item" @click="selectSearchBy('balance')">Balance</div>
				<!-- <div class="search-list-item" @click="selectSearchBy('isActive')">Active</div> -->
				<div class="search-list-item" @click="selectSearchBy('registered')">Registered</div>
				<div class="search-list-item" @click="selectSearchBy('state')">State</div>
				<div class="search-list-item" @click="selectSearchBy('country')">Country</div>
			</div>
		</div>
		<div class="pagination-step-container">
			<div class="paination-step-button" @click="togglePaginationList">{{ paginationStep }}</div>
			<div class="pagination-step-list" :class="{opened: openPaginationList}">
				<span @click="selectPaginationStep(20)">20</span>
				<span @click="selectPaginationStep(50)">50</span>
				<span @click="selectPaginationStep(100)">100</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// props: ['fixedUsersList'],
	data(){
		return{
			filterValue: '',
			searchBy: 'fullName',
			openSearchList: false,
			openPaginationList: false,
			paginationStep: 20
		}
	},
	emits: ['filter-users', 'pagination-step'],
	methods: {
		toggleSearchList(){
			this.openPaginationList = false;
			this.openSearchList = !this.openSearchList;
		},
		togglePaginationList(){
			this.openSearchList = false;
			this.openPaginationList = !this.openPaginationList;
		},
		selectSearchBy(value){
			this.searchBy = value;
			this.toggleSearchList();			
		},
		selectPaginationStep(value){
			this.paginationStep = value;
			this.togglePaginationList();
			this.$emit('pagination-step', {step: value});
		},
		filter(){
			this.$emit('filter-users', {filterByValue: this.filterValue, filterByColumn: this.searchBy});
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
	.search-list-container,
	.pagination-step-container{
		position: relative;
		display: inline-block;
		.search-list-button,
		.paination-step-button{
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
		.search-list-box,
		.pagination-step-list{
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
			div,
			span{
				display: block;
				cursor: pointer;
				&:hover{
					background: rgba($color: $yellow, $alpha: 0.5);
					font-weight: bold;
				}
			}
		}
		.paination-step-button{
			width: 100px;
			margin-left: 10px;
		}

	}
}
</style>