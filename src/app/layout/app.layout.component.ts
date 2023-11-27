import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopBarComponent } from './app.topbar.component';
import { BreadcrumbService } from 'src/shared/breadcrumb.service';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy, OnInit {

    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;
    profileMenuOutsideClickListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    breadcrumbs: any[] = [];

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public breadcrumbService: BreadcrumbService
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(
                        this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                        this.appSidebar.el.nativeElement.contains(event.target) ||
                        this.appTopbar.menuButton.nativeElement.isSameNode(event.target) ||
                        this.appTopbar.menuButton.nativeElement.contains(event.target)
                    );

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(
                        this.appTopbar.menu.nativeElement.isSameNode(event.target) ||
                        this.appTopbar.menu.nativeElement.contains(event.target) ||
                        this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) ||
                        this.appTopbar.topbarMenuButton.nativeElement.contains(event.target)
                    );

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        });
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(
                new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'),
                ' '
            );
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive':
                this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple,
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.updateBreadcrumbs();
        });

        
    }

    private updateBreadcrumbs(): void {
        const breadcrumbs: any[] = this.createBreadcrumbs(this.activatedRoute.root);
        this.breadcrumbService.updateBreadcrumbs(breadcrumbs);        
    }

    private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
        const children: ActivatedRoute[] = route.children;
    
        if (children.length === 0) {
            return breadcrumbs;
        }
    
        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }
            breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], routerLink: url,});
            this.createBreadcrumbs(child, url, breadcrumbs);
        }
        
        return breadcrumbs.filter((breadcrumb, index, self) => self.findIndex(b => b.label === breadcrumb.label) === index);;
    }
    
    
    
}


