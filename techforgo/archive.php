<?php
/**
 * The template for displaying archive pages
 *
 * @package TechForGo
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<header class="tfg-page-header">
			<?php
			the_archive_title( '<h1 class="tfg-archive-title">', '</h1>' );
			the_archive_description( '<div class="tfg-archive-description">', '</div>' );
			?>
		</header>

		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<?php if ( have_posts() ) : ?>

					<div class="tfg-posts-grid">
						<?php
						while ( have_posts() ) :
							the_post();
							get_template_part( 'template-parts/content-card' );
						endwhile;
						?>
					</div>

					<?php techforgo_pagination(); ?>

				<?php else : ?>
					<div class="tfg-no-posts">
						<h2><?php esc_html_e( 'No Publications Found', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'No articles found in this archive collection.', 'techforgo' ); ?></p>
					</div>
				<?php endif; ?>
			</div>

			<?php get_sidebar(); ?>
		</div>

	</div>
</main>

<?php
get_footer();
