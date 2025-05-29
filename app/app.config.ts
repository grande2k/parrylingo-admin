export default defineAppConfig({
	ui: {
		icons: {
			loading: "line-md:loading-twotone-loop",
		},
		table: {
			slots: {
				root: "bg-white rounded-xl border border-gray-200",
			},
		},
		switch: {
			slots: {
				base: "cursor-pointer",
			},
		},
		checkbox: {
			slots: {
				base: "cursor-pointer",
				description: "text-slate-400",
			},
		},
		dropdownMenu: {
			slots: {
				item: "cursor-pointer",
			},
		},
		tabs: {
			slots: {
				trigger: "cursor-pointer",
			},
			compoundVariants: [
				{
					color: "neutral",
					variant: "link",
					class: {
						list: "border-[#8A8F9329]",
						indicator: "bg-primary h-[2px]",
						trigger: "data-[state=active]:text-primary data-[state=active]:font-bold",
					},
				},
			],
		},
		formField: {
			slots: {
				label: "block font-medium text-sm text-graphite-700",
			},
		},
		pagination: {
			slots: {
				first: "cursor-pointer",
				prev: "cursor-pointer",
				item: "cursor-pointer",
				next: "cursor-pointer",
				last: "cursor-pointer",
			},
		},
		input: {
			variants: {
				size: {
					xl: {
						base: "rounded-lg",
					},
					"2xl": {
						base: "px-3.5 py-3 text-base rounded-lg gap-2",
						leading: "ps-4",
						trailing: "pe-2",
						leadingIcon: "size-6",
						leadingAvatarSize: "xs",
						trailingIcon: "size-6",
					},
				},
			},
		},
		textarea: {
			variants: {
				size: {
					xl: {
						base: "rounded-lg",
					},
					"2xl": {
						base: "px-3.5 py-3 text-base rounded-lg gap-2",
						leading: "ps-4",
						trailing: "pe-2",
						leadingIcon: "size-6",
						leadingAvatarSize: "xs",
						trailingIcon: "size-6",
					},
				},
			},
		},
		button: {
			slots: { base: "cursor-pointer" },
			variants: {
				size: {
					xl: { base: "rounded-lg" },
					"2xl": { base: "px-4 py-3.5 text-base rounded-lg font-semibold gap-2" },
				},
			},
		},
		navigationMenu: {
			slots: {
				item: "mb-2",
				link: "text-md text-primary gap-3 cursor-pointer font-medium hover:before:bg-graphite-50 ",
				linkLeadingIcon: "text-xl",
			},
			variants: {
				orientation: {
					vertical: { link: "px-3 py-2" },
				},

				active: {
					true: {
						link: "!text-white before:!bg-primary",
						linkLeadingIcon: "!text-white",
					},
				},
			},
		},
	},
});
