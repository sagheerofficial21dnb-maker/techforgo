<?php
/**
 * Breadcrumbs template part
 *
 * @package TechForGo
 * @since 1.0.0
 */

if ( is_front_page() ) {
	return;
}
?>
<nav class="tfg-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumbs', 'techforgo' ); ?>">
	<ol class="tfg-breadcrumbs-list" itemscope itemtype="https://schema.org/BreadcrumbList">
		<li class="tfg-breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="item">
				<span itemprop="name"><?php esc_html_e( 'Home', 'techforgo' ); ?></span>
			</a>
			<meta itemprop="position" content="1" />
		</li>
		<span class="tfg-breadcrumb-sep" aria-hidden="true">/</span>

		<?php if ( is_singular( 'post' ) ) : ?>
			<?php
			$categories = get_the_category();
			if ( ! empty( $categories ) ) :
				$cat = $categories[0];
				?>
				<li class="tfg-breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
					<a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>" itemprop="item">
						<span itemprop="name"><?php echo esc_html( $cat->name ); ?></span>
					</a>
					<meta itemprop="position" content="2" />
				</li>
				<span class="tfg-breadcrumb-sep" aria-hidden="true">/</span>
			<?php endif; ?>
			<li class="tfg-breadcrumb-item current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
				<span itemprop="name"><?php the_title(); ?></span>
				<meta itemprop="position" content="3" />
			</li>

		<?php elseif ( is_category() ) : ?>
			<li class="tfg-breadcrumb-item current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
				<span itemprop="name"><?php single_cat_title(); ?></span>
				<meta itemprop="position" content="2" />
			</li>

		<?php elseif ( is_search() ) : ?>
			<li class="tfg-breadcrumb-item current" aria-current="page">
				<span><?php printf( esc_html__( 'Search: "%s"', 'techforgo' ), get_search_query() ); ?></span>
			</li>

		<?php elseif ( is_page() ) : ?>
			<li class="tfg-breadcrumb-item current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
				<span itemprop="name"><?php the_title(); ?></span>
				<meta itemprop="position" content="2" />
			</li>

		<?php elseif ( is_home() ) : ?>
			<li class="tfg-breadcrumb-item current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
				<span itemprop="name"><?php esc_html_e( 'Blog Archive', 'techforgo' ); ?></span>
				<meta itemprop="position" content="2" />
			</li>

		<?php else : ?>
			<li class="tfg-breadcrumb-item current" aria-current="page">
				<span><?php the_archive_title(); ?></span>
			</li>
		<?php endif; ?>
	</ol>
</nav>
