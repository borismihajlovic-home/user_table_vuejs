<template>
	<div v-if="usersToShow.length>0 && !isLoading && !isError && !isNoUser" class="users-table">
		<div class="users-table-header">
			<div id="fullName" @click="sortByColumn">Name <i v-if="sortedColumn === 'fullName'" class="fas fa-sort-down"></i></div>
			<div id="balance" @click="sortByColumn">Balance <i v-if="sortedColumn === 'balance'" class="fas fa-sort-down"></i></div>
			<div id="isActive" @click="sortByColumn">Active <i v-if="sortedColumn === 'isActive'" class="fas fa-sort-down"></i></div>
			<div id="registered" @click="sortByColumn">Registered <i v-if="sortedColumn === 'registered'" class="fas fa-sort-down"></i></div>
			<div id="state" @click="sortByColumn">State <i v-if="sortedColumn === 'state'" class="fas fa-sort-down"></i></div>
			<div id="country" @click="sortByColumn">Country <i v-if="sortedColumn === 'country'" class="fas fa-sort-down"></i></div>
		</div>
		<div class="users-data-container">
			<div v-for="u in usersToShow" :key="u.id" class="user-data-row">
				<div>{{ u.fullName }}</div>
				<div>{{ u.balance }}</div>
				<div class="active-user">{{ u.isActive ? 'yes' : 'no' }}</div>
				<div>{{ u.registered }}</div>
				<div>{{ u.state }}</div>
				<div>{{ u.country  }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['usersToShow', 'isError', 'isLoading', 'isNoUser'],
	data(){
		return{
			sortedColumn: 'fullName'
		}
	},
	emits: ['sort-by'],
	methods: {
		sortByColumn(event){
			const sortByValue = event.target.id;
			this.sortedColumn = sortByValue;
			this.$emit('sort-by', sortByValue);
		}
	}
}
</script>

<style lang="scss" scoped>
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
</style>