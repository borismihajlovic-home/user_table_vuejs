<template>
	<div class="loader-container"><div class="loader"></div></div>
</template>

<style lang="scss" scoped>
    .loader-container{
            position: fixed;
            background: rgba($color: $black, $alpha: 0.5);
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 99;
            display: flex;
            justify-content: center;
            align-items: center;
		.loader {
			display: inline-block;
			width: 100px;
			height: 100px;
		}
		.loader:after {
			content: '';
			display: block;
			width: 80px;
			height: 80px;
			margin: 8px;
			border-radius: 50%;
			border: 6px solid #fff;
			border-color: #fff transparent #fff transparent;
			animation: loaderSpin 1.2s linear infinite;
		}
		@keyframes loaderSpin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
</style>